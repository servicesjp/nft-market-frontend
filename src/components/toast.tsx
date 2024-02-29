import { ToastContainer as ToastifyContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Just a wrapper to avoid exposing toastify
export function ToastContainer() {
    return <ToastifyContainer />
}

export function showErrorToast(title: string): void {
    toast.error(title?.substring(0, 100), {
        position: toast.POSITION.TOP_RIGHT
    });
}

export function showSuccessToast(title: string): void {
    toast.success(title, {
        position: toast.POSITION.TOP_RIGHT
    });
}

export function showInfoToast(title: string): void {
    toast.info(title, {
        position: toast.POSITION.TOP_RIGHT
    });
}