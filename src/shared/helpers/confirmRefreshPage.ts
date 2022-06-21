export const confirmRefreshPage = () => {
    const alertUser = (e: any) => {
        e.preventDefault();
        e.returnValue = '';
    }
    window.addEventListener('beforeunload', alertUser);
    return () => {
        window.removeEventListener('beforeunload', alertUser);
    };
}