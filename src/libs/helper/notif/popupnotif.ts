import Swal from "sweetalert2"

export const SuccessNotif = (message?: string) => {
    Swal.fire({
        title: "Data processed successfully!",
        text: message ?? "",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
    })
}

export const ErrorNotif = (message?:string) => {
    Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: message || ""
    })
}

export const WarningNotif = (message?: string) => {
    Swal.fire({
        icon: 'warning',
        title: 'Something went wrong',
        text: message || "",
    })
}

export const ConfirmNotifDelete = async (): Promise<boolean> => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "Deleted data cannot be restored",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
        return true;
    } else {
        return false;
    }
}

interface ConfirmNotifProps {
    messageText: string,
    titleText: string,
    confirmButtonText: string
}
export const ConfirmNotif = async (props: ConfirmNotifProps): Promise<boolean> => {
    const result = await Swal.fire({
        title: props.titleText,
        text: props.messageText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: props.confirmButtonText
    });

    if (result.isConfirmed) {
        return true;
    } else {
        return false;
    }
}
