export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: "low" | "medium" | "high";
    status: "todo" | "in-progress" | "completed";
}
