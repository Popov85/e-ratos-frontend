export type Help = {
    helpId: number;
    name: string;
    help: string;
    resource: {
        resourceId: number,
        link: string
    };
}