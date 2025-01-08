import TeamPictures from '../../teamPictures';
export default function Home() {
  return (
    <div>
      <TeamPictures team="WEB" department="CREATIVE" numDepartmentTeams={4} people={[
        { name: 'Suyeon Cha', role: 'Co-Head of Web' },
        { name: 'Viviana Staicu', role: 'Co-Head of Web' },
        { name: 'Margaret He', role: 'Member of Web' },
        { name: 'Annie Geng', role: 'Member of Web' },
        { name: 'Kaitlyn Ng', role: 'Member of Web' },
        { name: 'Suanna Zhong', role: 'Member of Web' },
        { name: 'Sophie Feng', role: 'Member of Web' },
        { name: 'Xiao Yuan', role: 'Member of Web' },
        { name: 'Lucy Wang', role: 'Member of Web' },
  ]} />
    </div>
  );
}
