import React from 'react';

export default function usePreviewImage(inputFile: File | undefined) {
    const [preview, setPreview] = React.useState<string>('');

    React.useEffect(() => {
        if (inputFile !== undefined && typeof (inputFile) !== 'string') {
            const first = inputFile;
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setPreview(fileReader.result as string);
            };
            fileReader.readAsDataURL(first);
        } else {
            setPreview('');
        }
    }, [inputFile]);

    return { preview };
}