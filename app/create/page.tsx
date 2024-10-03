import CreateHeader from 'ui/Sections/Create/CreateHeader';

function page() {
  return (
    <div>
      <CreateHeader />
      <div className=" dark:border-t-zinc-800 border-t-zinc-300 border-t  h-full  mx-auto justify-center mt-2.5">
        {/* <Suspense fallback={<LoadingContainer />}>
          <UserCreations />
        </Suspense> */}
      </div>
      <div className="mb-24" />
    </div>
  );
}

export default page;
