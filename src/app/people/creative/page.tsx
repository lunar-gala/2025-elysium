import DepartmentMenu from '../departmentMenu'
export default function Home() {
  return (
    <div>
      <DepartmentMenu department="CREATIVE" teams={['PHOTO', 'WEB', 'PRINT', 'STAGE']}/>
    </div>
  );
}
