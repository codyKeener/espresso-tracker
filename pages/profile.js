import DefaultParametersForm from '../components/defaultParametersForm';

export default function userProfile() {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>profile page</div>
        <div style={{ width: '50%' }}><DefaultParametersForm /></div>
      </div>
    </>
  );
}
