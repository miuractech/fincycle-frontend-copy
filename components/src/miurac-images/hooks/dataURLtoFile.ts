import { v4 as uuidv4 } from 'uuid';

export const dataURLtoFile = (dataURL: string | null | undefined, fileName?:string) => {
  
    return new Promise((resolve,reject)=>{
        if (!dataURL) resolve(null)
        else{
            fetch(dataURL)
              .then(res => res.blob())
              .then(blob => {
                const myBlob = blobToFile(blob, "")
                const file = new File([myBlob], fileName??`${uuidv4()}.png`, {
                  type: 'image/png'
              })
              resolve(file)
            })
            .catch(err => reject(err))
        }
    })
    
    }

    const blobToFile = (theBlob: Blob, fileName: string): File => {
        const b: any = theBlob;
        b.lastModifiedDate = new Date();
        b.name = fileName;
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return <File>theBlob;
}