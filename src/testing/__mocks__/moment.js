const moment = require.requireActual('moment');		// 1

export default (timestamp = 0) => {					// 2
    return moment(timestamp)
}

// 1 -	load the REAL moment, which is called inside
//		the 'mocked' moment
// 2 -	set the default to '0' during the tests
//		because the actual component sets the default
//		to 'now', which would make every single snapshot
//		different, which would fail