import { useEffect, useState } from "react"
import '../styles/Card.css'
import { hamsterObject } from '../AtomsAndModels/atoms'
import { useRecoilValue, useRecoilState } from 'recoil'

interface Props {
  title: Number;
}


const Card = (props:Props) => {

  const [page, changepage] = useState(0)
  const hamster = useRecoilValue(hamsterObject)

  useEffect(() => {
    if(props.title == 1) {
      changepage(1)
      console.log(hamster)
    }
    if(props.title == 2) {
      changepage(2)
      console.log(hamster)
    }

  }, [])

  return (
    <div>
      {page === 1 ? hamster.map((h, i)=> {
          return <div className='hej' key={i}>
        <div className={'center' + (page === 1 ? 1 : '')}>
          <div className={'property-card' + (page === 1 ? 1 : '')}>
            <a href="#">
              <div className={'property-image' + (page === 1 ? 1 : '')}>
                <div className={'property-image-title' + (page === 1 ? 1 : '')}>
                  <h5 key={h.name}> {h.name} </h5>
                </div>
              </div>
                </a>
              <div className={'property-description' + (page === 1 ? 1 : '')}>
                <h5> Card Title </h5>
                <p>Lorem Ipsum Dipsum hortata. Mixcall Horcho. Mixwell Chingo. More Bingo. Lorem Ipum doth be hard.</p>
              </div>
              <a href="#">
            </a>
          </div>
        </div>
      </div>
        }): <p> hejhej</p>}

      </div>
  )
}
export default Card
