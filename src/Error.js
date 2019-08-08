export const processError = (error, expl, clazz) => {
    // Connection error
    if (!error.hasOwnProperty('exception')) {
        console.error(error.message);
        clazz.setState({ error });
        return;
    }
    // Server error object processing
    const exception = error.exception;
    switch (exception) {
        case 'SessionAlreadyOpenedException':
            console.log('SessionAlreadyOpenedException');
            clazz.setState({ isOpened: true });
            break;
        case 'SessionNotFoundException':
            console.log('SessionNotFoundException');
            clazz.setState({ isNotFound: true });
            break;
        case 'RunOutOfTimeException':
            console.log('RunOutOfTimeException');
            clazz.setState({ isRunOutOfTime: true });
            break;
        default:
            console.error('Server returned an unexpected error =', error);
            clazz.setState({
                error: new Error(expl),
                serverError: error
            });
    }
}