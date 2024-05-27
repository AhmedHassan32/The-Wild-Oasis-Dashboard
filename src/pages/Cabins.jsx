import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import { useState } from 'react';

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;

{
  /*
   //   useEffect(function () {
  //     getCabins().then((data) => console.log(data));
  //   }, []);
  
  <p>TEST</p>
 <img src="https://sfxqhhlxkwiagdmihdlu.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" /> */
}
