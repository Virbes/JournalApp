import React from 'react';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {

    const noteDate = moment(date);
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch(activeNote(id, { date, title, body, url }));
    }

    return (
        <div className='journal__entry' onClick={handleEntryClick}>

            <div className='journal__info'>
                {
                    url &&
                    <div
                        className='journal__entry-picture'
                        style={{ backgroundSize: 'cover', backgroundImage: `url(${url})` }}
                    ></div>
                }


                <div className="journal__entry-body">
                    <p className='journal__entry-title mb-1'>{title}</p>

                    <p className="journal__entry-content">
                        {
                            body.length <= 20 ? body : body.substring(0, 20) + ' .....'
                        }
                    </p>
                </div>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('D')}</h4>
            </div>

        </div>
    );
}
