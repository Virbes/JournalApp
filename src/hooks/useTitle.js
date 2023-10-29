import { useEffect } from 'react';

export const useTitle = (title = '') => {

    useEffect(() => {
        const page = title && `| ${title}`;
        document.title = `Journal App ${page}`;
    }, [title]);
    
}