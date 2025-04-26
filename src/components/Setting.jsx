import { useEffect, useState } from 'react';


const Setting = ({ modalOpen, setModalOpen }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [input, setInput] = useState('');

  // const saveKey = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setErrorMsg('');
  //   const keys = input;

  //   await checkApiKey(keys)
  //     .then(() => {
  //       window.localStorage.setItem('api-key', keys);
  //       console.log('works');
  //       setModalOpen(false);
  //     })
  //     .catch(() => {
  //       console.log('doesnt work');
  //       setErrorMsg('error: incorrect keys');
  //     });

  //   setLoading(false);
  // };

  // const removeApiKey = () => {
  //   window.localStorage.removeItem('`api-key`');
  //   setInput('');
  // };

  // useEffect(() => {
  //   if (modalOpen) {
  //     setInput(apiKey);
  //   }
  // }, [apiKey, modalOpen]);

  return (
    <form
      
      className='flex flex-col items-center justify-center gap-2'>
      <p className='text-lg font-semibold'>Use your own API-key.</p>
      <p>keys are saved in your own browser</p>
      <p className='italic'>
        Get OpenAI API key{' '}
        <a
          className='text-blue-600'
          rel='noreferrer'
          target='_blank'
          href='#'>
          here
        </a>
        .
      </p>
      <input
    
        type='password'
        className='w-full max-w-xs input input-bordered'
      />
      <button  className='w-full max-w-xs btn btn-outline'>
       
      </button>
    </form>
  );
};

export default Setting;

