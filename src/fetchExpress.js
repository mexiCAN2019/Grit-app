// const { response } = require('express'); dont know where this came from

const Express = {};
const baseUrl = 'http://localhost:3001/api';

Express.getYears = () => {
    const url = `${baseUrl}/years`
    return fetch(url).then(response => {
        if(!response.ok) {
            return [];
        } 
        return response.json()
    });
};

Express.createYear = year => {
    console.log(year);
    const url = `${baseUrl}/years`;
    const fetchOptions = {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({year: year})
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            return ['error'];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.year;
    });
};

Express.deleteYear = year => {
    const url = `${baseUrl}/years?year=${year}`;
    const fetchOptions = {
        method: 'DELETE'
    };
    return fetch(url,fetchOptions).then(response => {
        if(!response.ok){
            alert('Cannot Delete Year While Months Are Inside');
            return 'error 400';
        }
        return;
    });
};

// MONTH SEGMENT

Express.getMonths = (year) => {
    const url = `${baseUrl}/years/${year}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.months
    });
};

Express.createMonth = (year, month) => {
    const url = `${baseUrl}/years/${year}?month=${month}`;
    const fetchOptions = {
        method: 'POST',
        header: {'Content-Type': 'application/json'}
        // body: JSON.stringify({month: month}) using body wouldnt work. NOT NULL constraint fail: Months.month
    };
    console.log(month);
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            return [];
        }
        return response.json().then(jsonResponse => {
            return jsonResponse.month;
        });
    });
};

Express.deleteMonth = (year, id) => {
    const url = `${baseUrl}/years/${year}?monthId=${id}`;
    const fetchOptions = {
        method: "DELETE"
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            alert('Cannot Delete Month With Data Saved Inside');
            return 'error 400';
        }
        return;
    });
};

// WEEK SEGMENT

Express.getWeeks = (year, monthId) => {
    const url = `${baseUrl}/years/${year}/month?year=${year}&monthId=${monthId}`;
    return fetch(url).then(response => {
        if(!response.ok) {
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.weeks;
    });
};

Express.createWeek = (year, date, monthId) => {
    const url = `${baseUrl}/years/${year}/month?yearFK=${year}&week=${date}&monthId=${monthId}`;
    const fetchOptions = {
        method: "POST",
        header: {"Content-Type": "application/json"}
        // body: JSON.stringify({week: {week: date,
        //                             yearFK: year,
        //                             monthId: monthId}
        //                     }) cannot read property of 'week' of undefined
                        }
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            return [];
        }
        return response.json().then(jsonResponse => {
            return jsonResponse.week;
        });
    });
};

Express.deleteWeek = (year, weekId) => {
    const url = `${baseUrl}/years/${year}/month?weekId=${weekId}`;
    const fetchOptions = {
        method: 'DELETE'
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            alert('Cannot Delete Week With Information Inside');
            return 'error 400';
        }
        return;
    });
};


//Table (TimeLogger) Section
Express.getTables = (year, weekId) => {
    const url = `${baseUrl}/years/${year}/month/table?weekId=${weekId}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        } 
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.tables;
    });
};

Express.deleteTable = (year, id) => {
    const url = `${baseUrl}/years/${year}/month/table?id=${id}`;
    const fetchOptions = {
        method: 'DELETE'
    };
    return fetch(url, fetchOptions);
};

Express.createTable = (year, newTable) => {
    const url = `${baseUrl}/years/${year}/month/table`;
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({table: newTable})
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.table;
    });
};

Express.updateTable = (year, updatedTable) => {
    const url = `${baseUrl}/years/${year}/month/table`;
    const fetchOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({table: updatedTable})
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            alert('Error: Total Goal Hours must contain value, Name of skill cannot be left blank');
        } 
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.table;
    });
};

// Checkbox section

Express.getCheckboxes = (year, weekId) => {
    const url = `${baseUrl}/years/${year}/month/checkbox?weekId=${weekId}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.checkboxes;
    });
};

Express.createCheckbox = (year, newCheckbox) => {
    const url = `${baseUrl}/years/${year}/month/checkbox`;
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({checkbox: newCheckbox})
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.checkbox;
    });
};

Express.updateCheckbox = (year, updatedCheckbox) => {
    const url = `${baseUrl}/years/${year}/month/checkbox`;
    const fetchOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({checkbox: updatedCheckbox})
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.checkbox;
    });
};

Express.deleteCheckbox = (year, id) => {
    const url = `${baseUrl}/years/${year}/month/checkbox?id=${id}`;
    const fetchOptions = {
        method: 'DELETE'
    };
    return fetch(url, fetchOptions);
};

// Subjective Section

Express.getSubjectives = (year, weekId) => {
    const url = `${baseUrl}/years/${year}/month/subjective?weekId=${weekId}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.textboxes;
    });
};

Express.createSubjective = (year, newTextbox) => {
    const url = `${baseUrl}/years/${year}/month/subjective`;
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({textbox: newTextbox})
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.textbox;
    });
};

Express.updateSubjective = (year, updatedTextbox) => {
    const url = `${baseUrl}/years/${year}/month/subjective`;
    const fetchOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({textbox: updatedTextbox})
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.textbox;
    });
};

Express.deleteSubjective = (year, id) => {
    const url = `${baseUrl}/years/${year}/month/subjective?id=${id}`;
    const fetchOptions = {
        method: 'DELETE'
    };
    return fetch(url, fetchOptions);
};

// Month Review Section

Express.getTableSkills = (year, monthId) => {
    const url = `${baseUrl}/years/${year}/month/monthReview/table/${monthId}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.tables;
    });
};

Express.getCheckboxSkills = (year, monthId) => {
    const url = `${baseUrl}/years/${year}/month/monthReview/checkbox/${monthId}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.checkboxes;
    });
};

Express.createMonthReviewSubjective = (year, newTextbox) => {
    const url = `${baseUrl}/years/${year}/month/monthReview/subjective`;
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({textbox: newTextbox})
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.textbox;
    });
};

Express.getMonthReviewSubjective = (year, monthId) => {
    const url = `${baseUrl}/years/${year}/month/monthReview/subjective/${monthId}`;
    return fetch(url).then(response => {
        if(!response.ok) {
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.textbox;
    });
};

Express.updateReviewSubjective = (year, updatedTextbox) => {
    const url = `${baseUrl}/years/${year}/month/monthReview/subjective`;
    const fetchOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({textbox: updatedTextbox})
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return [];
        }
        return  response.json();
    }).then(jsonResponse => {
        return jsonResponse.textbox;
    });
};

// Year Review Section
Express.getYearTableSkills = year => {
    const url = `${baseUrl}/years/${year}/yearReview/table/${year}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.tables;
    });
};

Express.getYearCheckboxSkills = year => {
    const url = `${baseUrl}/years/${year}/yearReview/checkbox/${year}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.checkboxes;
    });
};

Express.createYearReviewSubjective = (year, newTextbox) => {
    const url = `${baseUrl}/years/${year}/yearReview/subjective`;
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({textbox: newTextbox})
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.textbox;
    });
};

Express.getYearReviewSubjective = year => {
    const url = `${baseUrl}/years/${year}/yearReview/subjective/${year}`;
    return fetch(url).then(response => {
        if(!response.ok) {
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.textbox;
    });
};

Express.updateYearReviewSubjective = (year, updatedTextbox) => {
    const url = `${baseUrl}/years/${year}/yearReview/subjective/`;
    const fetchOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({textbox: updatedTextbox})
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return [];
        }
        return  response.json();
    }).then(jsonResponse => {
        return jsonResponse.textbox;
    });
};

module.exports = Express;