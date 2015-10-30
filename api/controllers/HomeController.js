/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
  * Render the home page
  *
  * @param {Object} req
  * @param {Object} res
  */
  index: function (req, res) {
	  // Render the `/homepage` view
	  res.view({
		  layout    : 'layouts/base',
		  errors    : req.flash('error')
	  });
  },
};
