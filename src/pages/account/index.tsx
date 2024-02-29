import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AccountPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/account/vouchers');
  }, [router]);

  return null; // O un indicador de carga si es necesario
};

export default AccountPage;
