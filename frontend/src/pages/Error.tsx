import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as { status?: number }; 

    let title = "An error occured!";
    let message = "Something went wrong!";

    switch (error.status) {
        case 404:
            title = "Not Found!";
            message = "Could not find the resource or page.";
            break;
        case 401:
            title = "Unauthorized!";
            message = "You are not authorized to view this page.";
            break;
        case 403:
            title = "Forbidden!";
            message = "Access to this resource is forbidden.";
            break;
        case 500:
            title = "Server Error!";
            message = "There was a problem with the server.";
            break;
        default:
            title = "An error occurred!";
            message = "Something went wrong!";
    }

    return (
        <div className="mt-16 text-center">
            <h1 className="text-3xl mb-4 text-red-700">{title}</h1>
            <p className="text-xl">{message}</p>
        </div>
    );
}