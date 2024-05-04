export interface Project {
    id: string;
    name: string;
    description: string;
}
export  interface Items {
    items: Project[]
}
 export interface ProjectData {
    listProjects: Items;
}