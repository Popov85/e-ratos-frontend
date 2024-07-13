export type Student = {
    studId: number | null;
    user: {
        userId: number;
        name: string;
        surname: string;
        email: string;
        password: string;
    };
    orgId: number;
    facId: number;
    classId: number;
    entranceYear: number;
};