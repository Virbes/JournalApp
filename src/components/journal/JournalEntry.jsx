import React from 'react';

export const JournalEntry = () => {
    return (
        <div className='journal__entry'>
            <div
                className='journal__entry-picture'
                style={{ backgroundSize: 'cover', backgroundImage: 'url(assets/images/scarlett.jpg)' }}
            ></div>


            <div className="journal__entry-body">
                <p className='journal__entry-title mb-1'>Un nuevo dia</p>

                <p className="journal__entry-content">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit, dolorem?
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>

        </div>
    );
}
