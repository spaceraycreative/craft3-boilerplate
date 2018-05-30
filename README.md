Spaceray Creative - Craft 3.x Boilerplate
==========

This is the Spaceray Creative boilerplate project for any [Craft CMS](https://www.craftcms.com) 3.x website. 

## Dependencies

* [Craft CMS 3.x](https://craftcms.com)
* [Yarn](https://yarnpkg.com/en/docs/install)
* [Gulp](http://gulpjs.com/)

## Project Setup

* Run `yarn install` from the project root to install all the project dependencies.
* Create a new database on your local environment and import the `craft3-boilerplate.sql` database.
* Open `package.json`  and in the `urls` section, set your `local` URL to be that of your project.
* Open `.example.env.php` and change all the `"REPLACE_ME"` fields to match your environment. After everything is properly setup, save the file as `.env.php`.

### Project Usage 

**Using Gulp**

Run the following command in your terminal from the project's root directory to watch your project:

```
gulp
```

To build all the assets and place into the `web` folder run:

```
gulp build
```

## Copyright & License
Copyright 2018 Spaceray Creative. Code released under the MIT License