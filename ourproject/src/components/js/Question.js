import React from 'react';

function Question({ question, answer, index, styles }) {
    return (
        <div className="cards">
            <div className="card-header" id={`question-${index}`}>
                <h2 className="mb-0">
                    <button
                        className={`btn btn-link btn-block text-left ${styles ? 'active' : ''}`}
                        type="button"
                        data-toggle="collapse"
                        data-target={`#answer-${index}`}
                        aria-expanded="true"
                        aria-controls={`answer-${index}`}
                        style={styles}
                    >
                        {question}
                    </button>
                </h2>
            </div>

            <div
                id={`answer-${index}`}
                className="collapse"
                aria-labelledby={`question-${index}`}
                data-parent="#faqAccordion"
            >
                <div className="card-body">{answer}</div>
            </div>
        </div>
    );
}

export default Question;
