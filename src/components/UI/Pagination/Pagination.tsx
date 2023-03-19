import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import { getUsersTC } from '../../../redux/UserReducer';
//@ts-ignore
import st from './Pagination.module.css'

type PaginationPropsType = {
    totalCount: number
    pagesCount: number
    page: number
    portionSize?: number,
}

const Pagination = ({totalCount=0, pagesCount, page, portionSize=10, ...props} : PaginationPropsType) => {
    const dispatch = useAppDispatch()
    
    let pageCount = Math.ceil(totalCount/pagesCount)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pageCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const onPageChanged = (currentPage: number) => {
            dispatch(getUsersTC({pageNumber: currentPage}))
    }  

  return (
    <div>
       {
            portionNumber > 1 &&
            <button
                    className={st.btn}
                    onClick={() => {setPortionNumber(portionNumber - 1)}}>{'<'}
            </button>
        }
                
        {   
            pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span
                            className={page === p ? st.selectedPage : st.select}
                            onClick={() => {onPageChanged(p)}}>{p}
                       </span>
                       }
                 )}
                 
        {
            portionCount > portionNumber &&
            <button 
                    className={st.btn}
                    onClick={() => {setPortionNumber(portionNumber + 1)}}>{'>'}
            </button>
        }
    </div>
  )
}

export default Pagination
