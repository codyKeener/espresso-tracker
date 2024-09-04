import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleShot } from '../../../api/shotData';
import ShotForm from '../../../components/shotForm';

export default function EditPost() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleShot(id).then(setEditItem);
  }, [id]);

  return (<ShotForm obj={editItem} />);
}
