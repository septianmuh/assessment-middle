import DashboardLayout from "../nav-layout";
import Page from "./page.client";
import { Provider } from "./provider";

export default function LoginPage(){
    return (
        <DashboardLayout>
            <Provider>
                <Page></Page>
            </Provider>
        </DashboardLayout>
    )
}