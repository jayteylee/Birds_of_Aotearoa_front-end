function Card(props) {

  return (
    <div className='flex flex-col relative bg-boa-white w-[275px] h-[400px] m-8 shadow-xl rounded-lg overflow-hidden'>
      <div className='w-full h-[183px]'>
      <div className="relative w-full h-full">
        <img className="w-full h-full" src={props.img} alt="test photo" objectfit={'cover'}/>

        <p className="absolute text-3xl py-4 px-4 bottom-0 left-0 text-white">{props.primName}</p>
        <p className="absolute text-[7px] py-2 px-4 bottom-0 left-0 text-white">Photo by {props.credit}</p>
        </div>
      </div>
      <h2 className='text-lg text-left pr-2 pl-3 py-3 font-serif font-extrabold'>
      {props.name}
      </h2>
      <div className='block'>
        <div className="flex flex-row">
          <div>
          <p className="font-bold text-xs px-2 pb-1 ml-2">Scientific Name:</p> 
          <p className="font-bold text-xs px-2 pb-1 ml-2">Family:</p> 
          <p className="font-bold text-xs px-2 pb-1 ml-2">Order:</p> 
          <p className="font-bold text-xs px-2 pb-1 ml-2">Status:</p> 
          <p className="font-bold text-xs px-2 pb-1 ml-2">Length:</p> 
          <p className="font-bold text-xs px-2 pb-1 ml-2">Weight:</p> 
          </div>
          <div>
          <p className="text-xs pb-1 italic font-medium">{props.sciName} </p>
          <p className="text-xs pb-1 italic font-medium">{props.family} </p>
          <p className="text-xs pb-1 italic font-medium">{props.order} </p>
          <p className="text-xs pb-1">{props.status} </p>
          <p className="text-xs pb-1">{props.length} {props.lengthUnit}</p>
          <p className="text-xs pb-1">{props.weight} {props.weightUnit} </p>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Card;
