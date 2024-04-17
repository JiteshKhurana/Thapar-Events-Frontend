import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';


const SuperAdminDashboardAddSociety = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data:any) => {console.log(data)};

  console.log(errors);

  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col p-5 md:p-12">
        <span className='mt-5 text-xl font-semibold'>Add Society</span>
        <span className='mt-0 text-muted-foreground text-sm'>Register a new society</span>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-6'>
          <div className="name-input my-1">
          <span className='text-sm font-medium'>Society Name</span>
          <Input className='w-full max-w-[500px]' type="text" placeholder="Society Name" {...register("Society Name", { required: true })} />
          </div>

          <div className="email-input my-1">
          <span className='text-sm font-medium'>Society Email</span>
          <Input className='w-full max-w-[500px]' type="text" placeholder="Society Email" {...register("Society Email", { required: true })} />
          </div>

          
          <Button 
          onClick={onSubmit}
          className='my-5 w-full sm:w-[200px]'
          > 
          Create Society 
          </Button>
        </form>

      </div>
    </div>
  )
}

export default SuperAdminDashboardAddSociety