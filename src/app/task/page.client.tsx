"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "./provider";
import Inputbox from "@/components/form/inputbox";
import Button from "@/components/form/button";
import { faCheckCircle, faCircle, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Task } from "./type";
import LoadingOverlay from "@/components/loading";

export default function Page() {
    const { action, state } = useData();
    return (
        <>
            <LoadingOverlay isLoading={state.isLoading} />
            <div className="w-[80%] bg-white rounded-lg shadow-lg p-4 max-h-[85vh]">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col justify-center text-center">
                        <h1 className="text-lg font-semibold text-black" style={{ letterSpacing: `1.5px` }}>Task Management</h1>
                    </div>
                </div>
                <div className="p-2 flex flex-col">
                    <div className="mb-2 md:w-full text-black">
                        <Inputbox
                            id="id"
                            value={state.form.id}
                            disabled={true}
                            setValue={(val) => { action.changeForm('id', val) }}
                            type="hidden"
                        />
                    </div>
                    <div className="mb-2 md:w-full text-black">
                        <label htmlFor="task" className="block text-sm font-medium mb-1">Title</label>
                        <Inputbox
                            id="task"
                            setValue={(val) => { action.changeForm('task', val) }}
                            value={state.form.task}
                            type="text"
                            placeholder="Enter Task"
                            isError={state.isValidForm['task']}
                            setError={(val) => { action.resetErrForm(val, 'task') }}
                        />
                    </div>
                    <div className="mb-4 md:w-full flex justify-center">
                        <Button
                            onClick={action.addTask}
                            color="main"
                            className="px-8 py-2"
                            disabled={state.isLoading}
                        >
                            Add Task
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mb-2">
                    <div className="w-full overflow-auto max-h-[10rem]">
                        <h1 className="text-lg font-semibold text-black">List Task Progress</h1>
                        {state.listData && state.listData.length > 0 && (
                            state.listData.map((task: Task, index: number) => (
                                <div key={task.id as string} className="flex items-center justify-between bg-gray-200 rounded-lg shadow-lg py-4 mb-4 px-8">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-4">
                                            <span className={"text-gray-500"}>{task.task}</span>
                                            <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer mx-2" onClick={() => action.editTask(task.id as string)} />
                                        </div>
                                        <span className="text-gray-400 text-sm">{moment(task.created_at).fromNow()}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer mx-2" onClick={() => action.deleteTask(task.id as string)} />
                                        <span className="text-lg mr-2">
                                            <FontAwesomeIcon icon={faCircle} className="text-gray-500 cursor-pointer" onClick={() => action.handleCheck(task.id as string) } />
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="w-full mt-4 border-t-2 border-gray-300 pt-8 overflow-auto max-h-[10rem]">
                        <h1 className="text-lg font-semibold text-black">List Task Done</h1>
                        {state.listDataDone && state.listDataDone.length > 0 && (
                            state.listDataDone.map((task: Task, index: number) => (
                                <div key={task.id as string} className="flex items-center justify-between bg-blue-200 rounded-lg shadow-lg py-4 mb-4 px-8">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-4">
                                            <span className={"line-through text-gray-500"}>{task.task}</span>
                                            {/* <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer mx-2" onClick={() => action.editTask(task.id as string)} /> */}
                                        </div>
                                        <span className="text-gray-400 text-sm">{moment(task.created_at).fromNow()}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer mx-2" onClick={() => action.deleteTask(task.id as string)} />
                                        <span className="text-lg mr-2">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 cursor-pointer" />
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
