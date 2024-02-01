/*
#######################################################################
#
# Copyright (C) 2020-2023 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

//
// DO NOT MODIFY THIS FILE
//

require('dotenv').config();
const app = require('./app.js');

app.listen(3010, () => {
  console.log(`Server Running on port 3010`);
  console.log('API Testing UI: http://localhost:3010/v0/api-docs/');
});
