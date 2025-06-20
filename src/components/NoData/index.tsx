import { FC } from 'react';
// import { TbDatabaseOff } from 'react-icons/tb';
import './styles.css';
import noDataImage from '../../assets/svg/noData.svg'

interface NoDataProps {
  className?: string;
}

const NoData: FC<NoDataProps> = ({ className = '' }) => {
  return (
    <div className={`noData flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="icon-container mb-6">
        {/* <TbDatabaseOff className="noDataIcon" size={64} strokeWidth={1.5}/> */}
        <img src={noDataImage}/>
      </div>
      {/* <h2 className="noDataTitle text-xl font-semibold mb-2"></h2> */}
      <p className="noDataText text-center">
      Data not available due to insufficient sample size.
      </p>
    </div>
  );
};

export default NoData;