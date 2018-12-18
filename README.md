Spaceray Creative - Craft 3.x Boilerplate
==========
This is the Spaceray Creative boilerplate project for any [Craft CMS](https://www.craftcms.com) 3.x project. 

![Spaceray Creative Logo](/public/img/logo-on-light.svg "Spaceray Creative Logo")

## Dependencies

* [Craft CMS 3.x](https://craftcms.com)
* [Yarn](https://yarnpkg.com/en/docs/install)
* [Gulp](http://gulpjs.com/)

## Project Includes

* [Gulp](https://gulpjs.com/) for front-end workflow automation.
* [Bootstrap 4](http://getbootstrap.com/) is used as the Grid Framework.
* [Craft 3 Multi-Environment](https://github.com/nystudio107/craft3-multi-environment) is used for the multi-environment setup.
* Commonly used Craft CMS Plugins
    * [Contact Form](https://github.com/craftcms/contact-form)
    * [Contact Form Extensions](https://github.com/Rias500/craft-contact-form-extensions)
    * [Field Manager](https://github.com/verbb/field-manager)
    * [Imager](https://github.com/aelvan/Imager-Craft)
    * [Redactor](https://github.com/craftcms/redactor)
    * [SEOMatic](https://github.com/nystudio107/craft-seomatic)
    * [SimpleMap](https://github.com/ethercreative/simplemap)
    * [Typogrify](https://github.com/nystudio107/craft-typogrify)
    * [Video Embedder](https://github.com/mikestecker/craft-videoembedder)

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

## About Craft CMS
Craft CMS is a content-first CMS that aims to make life enjoyable for developers and content managers alike. Craft doesn’t make any assumptions about your content, or how it will be presented, so developers can spend their time building exactly what they need, rather than fighting with a pre-built theme.

Learn more about Craft at [craftcms.com](https://craftcms.com)

## Resources

**Official Resources**

* [Craft 3 Documentation](https://docs.craftcms.com/v3/)
* [Craft 3 Plugins](https://plugins.craftcms.com/)
* [Craft 3 Demo Site](https://demo.craftcms.com/)
* [Craft CMS Stack Exchange](https://craftcms.stackexchange.com/)

**Community Resources**

* [Straight Up Craft](https://straightupcraft.com/) - Articles, tutorials and more.
