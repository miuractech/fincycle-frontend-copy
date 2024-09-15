/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ActionIcon,
  Badge,
  LoadingOverlay,
  Switch,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { staffCollection } from './constants';
import AddEmployee from './addEmployee';
import EditEmployee from './editEmployee';
import { FilterComponent } from './FilterComponent';
import { db } from '@xcycle-tools/config';
import { EmployeeProfile } from '@xcycle-tools/types';
import { IconPencil } from '@tabler/icons-react';
//   import { Filter } from './Filter';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export function Employee({}: Props) {
  const [data, setData] = useState<EmployeeProfile[] | undefined>(undefined);
  const [editData, setEditData] = useState<EmployeeProfile | null>(null);
  const [loading, setloading] = useState(false);
  const mediaQuery = useMediaQuery('(min-width: 768px)');
  const q = query(staffCollection);
  useEffect(() => {
    const unsub = onSnapshot(q, (docs) => {
      const data = docs.docs.map((d) => ({ ...d.data(), id: d.id })) as any;
      setData(data);
    });
    return () => unsub();
  }, []);

  const columns = [
    {
      name: 'Status',
      cell: (row: EmployeeProfile) => (
        <Switch
          maxLength={20}
          checked={row.enabled}
          onChange={async () => {
            const docref = doc(db, 'employees', row.id);
            await updateDoc(docref, {
              enabled: !row.enabled,
              dashboardAction: 'reload',
            });
          }}
        />
      ),
      grow: 0.2,
    },
    {
      name: 'Name',
      cell: (row: EmployeeProfile) => row.name,
    },
    {
      name: 'position',
      cell: (row: EmployeeProfile) => row.position,
    },
    {
      name: 'Email',
      cell: (row: EmployeeProfile) => row.email,
    },
    {
      name: 'Access',
      cell: (row: EmployeeProfile) => <Badge> {row.access}</Badge>,
    },
    {
      name: 'Edit',
      cell: (row: EmployeeProfile) => (
        <ActionIcon onClick={()=>setEditData(row)} >
          <IconPencil />
        </ActionIcon>
      ),
    },
  ];
  // console.log(values);

  if (!data) return <LoadingOverlay visible />;
  return (
    <div className={` ${mediaQuery ? ' p-10' : ' py-4'} rounded-lg bg-white`}>
      <div>
        <Title ta="center" order={3} className="text-gray-700">
          Employees
        </Title>
      </div>
      <div className="grid lg:grid-cols-2 gap-5 my-5">
        <div>
          <FilterComponent
            setData={setData}
            loading={loading}
            setLoading={setloading}
          />
        </div>
        <div className="flex justify-end">
          <div className="justify-self-center col-span-4">
            <AddEmployee />
          </div>
        </div>
      </div>
      {/* <Filter
            selectedSubs={selectedSubs}
            setSelectedSubs={setSelectedSubs}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            values1={values1}
            handlers1={handlers1}
            filterFunction={filterFunction}
            popup={popup}
            setPopup={setPopup}
            getInitialData={getInitialData}
          /> */}

      {/* <div>
          <TextInput placeholder='Filter Name here' onChange={ (e) => setFilterText(e.target.value)}/>
          </div> */}
      <DataTable
        className="bg-transparent"
        // customStyles={{ headRow: { style: { color: '#A1A1A1' } } }}
        // @ts-ignore
        columns={
          mediaQuery
            ? columns
            : columns.filter((_, index: number) => {
                if ([0, 1, 4].includes(index)) {
                  return true;
                }
                return false;
              })
        }
        data={data}
        pagination
      />
      {editData && <EditEmployee data={editData} setData={setEditData} />}
    </div>
  );
}

export type staffType = {
  email: string;
  name: string;
  access: string[];
  id: string;
  enabled: boolean;
};
