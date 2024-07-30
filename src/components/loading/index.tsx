import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './index.css';

interface LoadingProps {
    isLoading: boolean
}
const LoadingOverlay: React.FC<LoadingProps> = ({ isLoading }) => {
    return (
        <div className={`loading-overlay ${isLoading ? 'active' : ''}`}>
            <div className="loading-spinner">
                <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            </div>
        </div>
    );
};

export default LoadingOverlay;
