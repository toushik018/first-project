
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: { message: string; }): TGenericErrorResponse => {

    // Use a regular expression to find text within double quotes
    const matches = err.message.match(/"([^"]*)"/);

    // Extract the content within double quotes
    const extractedMessage = matches && matches[1];

    const errorSources: TErrorSources = [{
        path: '',
        message: `${extractedMessage} is alredy exist`,
    }]
    const statusCode = 400;

    return {
        statusCode,
        message: `${extractedMessage} is alredy exist`,
        errorSources

    }

}


export default handleDuplicateError;