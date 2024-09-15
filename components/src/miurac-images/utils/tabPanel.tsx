import { Text } from "@mantine/core";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div style={{padding:12}}>
            <Text>{children}</Text>
          </div>
        )}
      </div>
    );
  }