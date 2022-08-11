import photo from './antipodes-island-parakeet-3.jpg';

function Card(props) {

  return (
    <div className='flex flex-col relative bg-boa-white w-[275px] h-[450px] m-8 shadow-xl rounded-lg overflow-hidden'>
      <div className='w-full basis-3/5'>
        <img src={photo} alt="test photo" objectFit={'contain'}/>
      </div>
      {
        props.name
      }
    </div>
  );

}

export default Card;
