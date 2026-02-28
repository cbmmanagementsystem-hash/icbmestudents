
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    idCourse: string;
  }>;
}) {
  const sp = await searchParams; // 👈 obrigatório no Next 15
    
  const params = {    
    idCourse: sp.idCourse,
  }

  return <div>CourseId: {params.idCourse}</div>;
}