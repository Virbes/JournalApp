import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className='notes__content'>

                <input type='text' placeholder='Some awesome a title' className='notes__title-input' />
                <textarea placeholder='What happend today' className='notes__textarea'></textarea>

                <div className="notes__image">
                    <img src="assets/images/grizx.jpg" alt="image" className='img-fluid' />
                </div>

            </div>
        </div>
    );
}
