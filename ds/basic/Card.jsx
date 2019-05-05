import React from 'react';

import './Card.scss';

const Card = ({ children }) => (
    <div className="card p-6">
        {children}
    </div>
);

export default Card;
