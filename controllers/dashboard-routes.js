const router = require('express').Router();
const sequelize = require('../config/connection');
const aws = require('aws-sdk');
const { Op } = require("sequelize");
const {
  User,
  Department,
  Role
} = require('../models');
const withAuth = require('../utils/auth');


router.get('/Sales', withAuth, (req, res) => {
  User.findAll({
    where: {
      "$Role.Department.name$": "Sales"
    },
    attributes: {
      include: ['first_name', 'last_name', 'phone', 'email', 'role.department_id'],
      exclude: ['password'],
    },
    include: [{
      model: Role,
      attributes: ["id", "title", "department_id"],
      include: {
        model: Department,
        attributes: ["name"]
      },
    },
    ]
  })
    .then((dbPostData) => {
      const users = dbPostData.map((user) => user.get({ plain: true }))
      // const name = window.location.toString().split('/')[
      //   window.location.toString().split('/').length - 1];
      res.render('Sales', {
        users,
        loggedIn: true,
        layout: 'nonav.handlebars'
        
      });
      console.log("user object being sent to handlebars", users)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get('/Engineering', withAuth, (req, res) => {
  User.findAll({
    where: {
      "$Role.Department.name$": "Engineering"
    },
    attributes: {
      include: ['first_name', 'last_name', 'phone', 'email', 'role.department_id'],
      exclude: ['password'],
    },
    include: [{
      model: Role,
      attributes: ["id", "title", "department_id"],
      include: {
        model: Department,
        attributes: ["name"],
        
      },
    },
    ]
  })
    .then((dbPostData) => {
      const users = dbPostData.map((user) => user.get({ plain: true }))
      // const name = window.location.toString().split('/')[
      //   window.location.toString().split('/').length - 1];
      res.render('Engineering', {
        users,
        loggedIn: true,
        layout: 'nonav.handlebars'
      });
      console.log("user object being sent to handlebars", users)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get('/Finance', withAuth, (req, res) => {
  User.findAll({
    where: {
      "$Role.Department.name$": "Finance"
    },
    attributes: {
      include: ['first_name', 'last_name', 'phone', 'email', 'role.department_id'],
      exclude: ['password'],
    },
    include: [{
      model: Role,
      attributes: ["id", "title", "department_id"],
      include: {
        model: Department,
        attributes: ["name"]
      },
    },
    ]
  })
    .then((dbPostData) => {
      const users = dbPostData.map((user) => user.get({ plain: true }))
      // const name = window.location.toString().split('/')[
      //   window.location.toString().split('/').length - 1];
      res.render('Finance', {
        users,
        loggedIn: true,
        layout: 'nonav.handlebars'
      });
      console.log("user object being sent to handlebars", users)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get('/Legal', withAuth, (req, res) => {
  User.findAll({
    where: {
      "$Role.Department.name$": "Legal"
    },
    attributes: {
      include: ['first_name', 'last_name', 'phone', 'email', 'role.department_id'],
      exclude: ['password'],
    },
    include: [{
      model: Role,
      attributes: ["id", "title", "department_id"],
      include: {
        model: Department,
        attributes: ["name"]
      },
    },
    ]
  })
    .then((dbPostData) => {
      const users = dbPostData.map((user) => user.get({ plain: true }))
      // const name = window.location.toString().split('/')[
      //   window.location.toString().split('/').length - 1];
      res.render('Legal', {
        users,
        loggedIn: true,
        layout: 'nonav.handlebars'
      });
      console.log("user object being sent to handlebars", users)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get('/Sanitation', withAuth, (req, res) => {
  User.findAll({
    where: {
      "$Role.Department.name$": "Sanitation"
    },
    attributes: {
      include: ['first_name', 'last_name', 'phone', 'email', 'role.department_id'],
      exclude: ['password'],
    },
    include: [{
      model: Role,
      attributes: ["id", "title", "department_id"],
      include: {
        model: Department,
        attributes: ["name"]
      },
    },
    ]
  })
    .then((dbPostData) => {
      const users = dbPostData.map((user) => user.get({ plain: true }))
      // const name = window.location.toString().split('/')[
      //   window.location.toString().split('/').length - 1];
      res.render('Sanitation', {
        users,
        loggedIn: true,
        layout: 'nonav.handlebars'
      });
      console.log("user object being sent to handlebars", users)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get('/all-users', withAuth, (req, res) => {
  User.findAll({

    attributes: {
      include: ['first_name', 'last_name', 'phone', 'email', 'role.department_id'],
      exclude: ['password'],
    },
    include: [{
      model: Role,
      attributes: ["id", "title", "department_id"],
      include: {
        model: Department,
        attributes: ["name"]
      },
    },
    ]
  })
    .then((dbPostData) => {
      const users = dbPostData.map((user) => user.get({ plain: true }))
      // const name = window.location.toString().split('/')[
      //   window.location.toString().split('/').length - 1];
      res.render('all-users', {
        users,
        loggedIn: true,
        layout: 'nonav.handlebars'
      });
      console.log("user object being sent to handlebars", users)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get('/', withAuth, (req, res) => {
  console.log("REQ", req);
  console.log("SESSION", req.session.user_id);
  const id = req.session.user_id;

  Department.findAll({
    attributes: ["id", "name"]
  })
    .then((dbPostData) => {
      const departments = dbPostData.map((department) => department.get({ plain: true }))

      res.render('dashboard', {
        departments,
        id,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log("ERROR", err);
      res.status(500).json(err);
    });
})

router.get('/users-by-name', withAuth, (req, res) => {
  console.log("QUERY STRING", req.query)
  User.findAll({
    where: {
      first_name: {
        [Op.like]: `%${req.query["first-name"]}%`
      }
    },
    attributes: {
      include: ['first_name', 'last_name', 'phone', 'email', 'role.department_id'],
      exclude: ['password'],
    },
    include: [{
      model: Role,
      attributes: ["id", "title", "department_id"],
      include: {
        model: Department,
        attributes: ["name"]
      },
    },
    ]
  })
    .then((dbPostData) => {
      const users = dbPostData.map((user) => user.get({ plain: true }))
      // const name = window.location.toString().split('/')[
      //   window.location.toString().split('/').length - 1];
      console.log("user object being sent to handlebars", users);
      res.render('users-by-name', {
        users,
        loggedIn: true,
        // layout: 'nonav.handlebars'
      });
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})


router.get('/:id', (req, res) => {
  // Access our User model and run .findAll() method)
  User.findOne({

    where: {
      id: req.session.user_id
    },
    attributes: {
      exclude: ['password']
    },

    // we've provided an attributes key and instructed the query to exclude the password column. It's in an array because if we want to exclude more than one, we can just add more.
  })
    .then(dbUserData => {
      // serialize data before passing to template
      const user = dbUserData.get({
        plain: true
      });
      res.render('dashboard', {
        user,
        loggedIn: true
      });
    })
})


// router.get('/:id', withAuth, (req, res) => {
//   Department.findAll({
//     attributes: ["id", "name"]
// })
//   .then((dbPostData) => {
//     const departments = dbPostData.map((department) => department.get({plain: true}))
//     res.render('dashboard', {departments, loggedIn: true});
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// })

const allDepts = Department.findAll({
  attributes: {
    exclude: ['createdAt', 'updatedAt']
  },
  include: [{
    model: Role,
    attributes: ['id', 'title', 'department_id'],

    include: [{
      model: User,
      attributes: {
        exclude: ['password']
      },
    }]

  }, ]
})
const allRoles = Role.findAll({
  attributes: {
    exclude: ['createdAt', 'updatedAt']
  },
  include: [{
      model: Department,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
    },
    {
      model: User,
      attributes: {
        exclude: ['password']
      },
    }
  ]

})

// const updateUser =   User.findOne({
//   // individualHooks: true,
//   where: {
//     id: req.params.id
//   },
//   include: [{
//     model: Role,
//     attributes: ["id", "title", "department_id"],
//     include: {
//       model: Department,
//       attributes: ["name"]
//     },
//   },
// ]
// })

router.get('/edit/:id', withAuth, (req, res) => {
  User.findOne({
      // individualHooks: true,
      where: {
        id: req.params.id
      },
      include: [{
        model: Role,
        attributes: ["id", "title", "department_id"],
        include: {
          model: Department,
          attributes: ["name"]
        },
      }, ]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No user found with this id'
        });
        return;
      }
      // console.log("DATA", dbUserData);
      // res.json(dbUserData);
      // })
      const user = dbUserData.get({
        plain: true
      });
      return user;
      // console.log("USER", user);
      // // pass data to template
      // res.render('edit-user', {
      //   user,
      //   loggedIn: req.session.loggedIn
      // });
    }).then(user => {
      Role.findAll({
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          include: [{
              model: Department,
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              },
            },
            {
              model: User,
              attributes: {
                exclude: ['password']
              },
            }
          ]

        })

        .then((dbRoleData) => {

          const roles = dbRoleData.map((role) => role.get({
            plain: true
          }))
          console.log("ROLES:", roles);
          res.render('edit-user', {
              user,
              roles,
              loggedIn: req.session.loggedIn
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
        });
    });
});

module.exports = router;