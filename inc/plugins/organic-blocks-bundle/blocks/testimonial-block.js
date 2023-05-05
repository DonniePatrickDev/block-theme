(function (data, blocks, editor, components, element, i18n, serverSideRender) {
  // Load Components
  var __ = i18n.__
  var el = element.createElement
  var withSelect = data.withSelect
  var useSetting = wp.blockEditor.useSetting
  var ServerSideRender = serverSideRender
  var BlockControls = wp.blockEditor.BlockControls
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar
  var InspectorControls = wp.blockEditor.InspectorControls
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var ColorGradientControl = wp.blockEditor.__experimentalColorGradientControl
  var ColorPalette = components.ColorPalette
  var ColorIndicator = components.ColorIndicator
  var PanelBody = components.PanelBody
  var Placeholder = components.Placeholder
  var ToggleControl = components.ToggleControl
  var SelectControl = components.SelectControl
  var RangeControl = components.RangeControl
  var BaseControl = components.BaseControl
  var UnitControl = components.__experimentalUnitControl
  var Spinner = components.Spinner
  var Button = components.Button
  var IconButton = components.IconButton

  // Dropdown Options
  var obbColors = [
    { name: __('White', 'obb'), color: '#fff' },
    { name: __('Black', 'obb'), color: '#000' },
    { name: __('Light Gray', 'obb'), color: '#eee' },
    { name: __('Medium Gray', 'obb'), color: '#808080' },
    { name: __('Brown', 'obb'), color: '#996633' },
    { name: __('Red', 'obb'), color: '#f00' },
    { name: __('Blue', 'obb'), color: '#006699' },
    { name: __('Green', 'obb'), color: '#99cc33' },
    { name: __('Pink', 'obb'), color: '#ff33cc' },
    { name: __('Teal', 'obb'), color: '#00cccc' },
    { name: __('Gold', 'obb'), color: '#cc9900' },
    { name: __('Purple', 'obb'), color: '#660099' }
  ]
  var gradientOptions = [
    {
      name: 'Midnight Hour',
      gradient: 'linear-gradient(180deg, rgb(0, 5, 80), rgb(124, 0, 163) 100%)',
      slug: 'midnight-hour'
    },
    {
      name: 'California Dusk',
      gradient: 'linear-gradient(135deg, rgb(223, 212, 0), rgb(156, 0, 163) 100%)',
      slug: 'california-dusk'
    },
    {
      name: 'Subtle Teal',
      gradient: 'linear-gradient(135deg, rgb(0, 219, 255), rgb(0, 197, 93) 100%)',
      slug: 'subtle-teal'
    },
    {
      name: 'Tokyo Sunset',
      gradient: 'linear-gradient(135deg, rgb(255, 0, 116), rgb(0, 40, 205) 100%)',
      slug: 'tokyo-sunset'
    },
    {
      name: 'Fire Blaze',
      gradient: 'linear-gradient(135deg, rgb(244, 182, 0), rgb(200, 0, 0) 100%)',
      slug: 'fire-blaze'
    },
    {
      name: 'Lime Light',
      gradient: 'linear-gradient(320deg, rgb(151, 236, 5), rgb(251, 230, 0) 100%)',
      slug: 'lime-light'
    }
  ]
  var speedOptions = [
    { label: __('2 Seconds', 'obb'), value: 2000 },
    { label: __('4 Seconds', 'obb'), value: 4000 },
    { label: __('6 Seconds', 'obb'), value: 6000 },
    { label: __('8 Seconds', 'obb'), value: 8000 },
    { label: __('10 Seconds', 'obb'), value: 10000 },
    { label: __('20 Seconds', 'obb'), value: 20000 },
    { label: __('30 Seconds', 'obb'), value: 30000 },
    { label: __('Hold Frame', 'obb'), value: 9999999999 }
  ]
  var styleOptions = [
    { label: __('Fade', 'obb'), value: 'fade' },
    { label: __('Slide', 'obb'), value: 'slide' }
  ]
  var slideOptions = [
    { label: __('Minimal', 'obb'), value: 'style-minimal' },
    { label: __('Modern', 'obb'), value: 'style-modern' },
    { label: __('Rounded', 'obb'), value: 'style-rounded' },
    { label: __('Overlap Rounded', 'obb'), value: 'style-overlap style-rounded' },
    { label: __('Overlap Modern', 'obb'), value: 'style-overlap style-modern' }
  ]
  var orderOptions = [
    { label: __('Ascending', 'obb'), value: 'ASC' },
    { label: __('Descending', 'obb'), value: 'DESC' }
  ]
  var layoutOptions = [
    { label: __('Top', 'obb'), value: 'content-position-top' },
    { label: __('Bottom', 'obb'), value: 'content-position-bottom' },
    { label: __('Left', 'obb'), value: 'content-position-left' },
    { label: __('Right', 'obb'), value: 'content-position-right' }
  ]
  var unitTypes = [
    { value: 'px', label: 'px' },
    { value: 'em', label: 'em' },
    { value: 'rem', label: 'rem' }
  ]
  var iconTypes = [
    { label: __('None', 'obb'), value: 'icon-none' },
    { label: __('Quote', 'obb'), value: 'icon-quote' },
    { label: __('Stars', 'obb'), value: 'icon-stars' }
  ]

  // Create custom Content Slideshow icon SVG.
  const testimonialsIcon = el('svg',
    {
      class: 'organic-testimonials-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M22 1h-20c-1.103 0-2 0.897-2 2v19c0 0.387 0.225 0.741 0.575 0.906 0.134 0.063 0.281 0.094 0.425 0.094 0.228 0 0.456-0.078 0.641-0.231l5.722-4.769h14.637c1.103 0 2-0.897 2-2v-13c0-1.103-0.897-2-2-2zM22 16h-15c-0.234 0-0.459 0.081-0.641 0.231l-4.359 3.634v-16.866h20v13z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M5 6h14v1h-14v-1z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M5 9h14v1h-14v-1z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M5 12h14v1h-14v-1z'
        }
      )
    )
  )

  // Register Block.
  const organicTestimonialBlock = blocks.registerBlockType('obb/testimonial-block', {
    title: __('Testimonials', 'obb'),
    description: __('Display a testimonial of selected posts or pages', 'obb'),
    icon: testimonialsIcon,
    category: 'organic-blocks',
    supports: {
      align: true,
      alignWide: true,
      anchor: true,
      spacing: { // Requires add_theme_support('custom-spacing');
        margin: true, // Enable margin UI control.
        padding: true // Enable padding UI control.
      }
    },
    attributes: {
      editMode: {
        type: 'boolean',
        default: true
      },
      textalignment: {
        type: 'string',
        default: 'center'
      },
      postbodysize: {
        type: 'string',
        default: '18px'
      },
      postauthorsize: {
        type: 'string',
        default: '14px'
      },
      iconsize: {
        type: 'string',
        default: '24px'
      },
      postcategory: {
        type: 'array'
      },
      posttype: {
        type: 'string'
      },
      posttaxonomy: {
        type: 'string'
      },
      transspeed: {
        type: 'number',
        default: 10000
      },
      transstyle: {
        type: 'string',
        default: 'fade'
      },
      poststyle: {
        type: 'string',
        default: 'style-minimal'
      },
      postorder: {
        type: 'string',
        default: 'DESC'
      },
      randomize: {
        type: 'boolean',
        default: false
      },
      postsperslide: {
        type: 'number',
        default: 1
      },
      testimonialicon: {
        type: 'string',
        default: 'icon-none'
      },
      displaytitle: {
        type: 'boolean',
        default: true
      },
      displayexcerpt: {
        type: 'boolean',
        default: true
      },
      displaylink: {
        type: 'boolean',
        default: true
      },
      displaybg: {
        type: 'boolean',
        default: true
      },
      displaycontentbg: {
        type: 'boolean',
        default: true
      },
      slidearrows: {
        type: 'boolean',
        default: true
      },
      slidenav: {
        type: 'boolean',
        default: true
      },
      contentlayout: {
        type: 'string',
        default: 'content-position-bottom'
      },
      testimonialsize: {
        type: 'number',
        default: 240
      },
      slidebgcolor: {
        type: 'string',
        default: 'transparent'
      },
      slidebggradient: {
        type: 'string'
      },
      titlecolor: {
        type: 'string',
        default: '#000'
      },
      contentcolor: {
        type: 'string',
        default: '#666'
      },
      iconcolor: {
        type: 'string',
        default: '#ccc'
      },
      contentbgcolor: {
        type: 'string',
        default: 'transparent'
      },
      contentbggradient: {
        type: 'string'
      }
      // buttonhovercolor: {
      //   type: 'string',
      //   default: '#006699'
      // }
    },
    edit: withSelect(function (select, props) {
      // Load pages & Categories based on Taxonomy and add to properties
      var taxonomy = props.attributes.posttaxonomy
      return {
        categories: select('core').getEntityRecords('taxonomy', taxonomy, { per_page: -1 }),
        pages: select('core').getEntityRecords('postType', 'page', { per_page: -1 }),
        testimonials: select('core').getEntityRecords('postType', 'jetpack-testimonial', { per_page: -1 }),
        types: select('core').getPostTypes({ per_page: -1 })
        // wooCats: wooCats
      }
    })(function (props) {
      // Load all attributes
      var postTypeBox = el(Spinner)
      var categoryBox = el(Spinner)
      var taxonomyBox = el(Spinner)
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var editMode = props.attributes.editMode
      var textalignment = props.attributes.textalignment
      var postbodysize = props.attributes.postbodysize
      var postauthorsize = props.attributes.postauthorsize
      var iconsize = props.attributes.iconsize
      var postcategory = props.attributes.postcategory
      var posttype = props.attributes.posttype
      var posttaxonomy = props.attributes.posttaxonomy
      var transspeed = props.attributes.transspeed
      var transstyle = props.attributes.transstyle
      var poststyle = props.attributes.poststyle
      var postorder = props.attributes.postorder
      var randomize = props.attributes.randomize
      var postsperslide = props.attributes.postsperslide
      var testimonialicon = props.attributes.testimonialicon
      var displaytitle = props.attributes.displaytitle
      var displayexcerpt = props.attributes.displayexcerpt
      var displaylink = props.attributes.displaylink
      var displaybg = props.attributes.displaybg
      var displaycontentbg = props.attributes.displaycontentbg
      var slidearrows = props.attributes.slidearrows
      var slidenav = props.attributes.slidenav
      var contentlayout = props.attributes.contentlayout
      var testimonialsize = props.attributes.testimonialsize
      var slidebgcolor = props.attributes.slidebgcolor
      var slidebggradient = props.attributes.slidebggradient
      var titlecolor = props.attributes.titlecolor
      var contentcolor = props.attributes.contentcolor
      var iconcolor = props.attributes.iconcolor
      var contentbgcolor = props.attributes.contentbgcolor
      var contentbggradient = props.attributes.contentbggradient
      // var buttonhovercolor = props.attributes.buttonhovercolor
      var postCategories = []
      var taxonomies = []
      var postTaxonomies = []

      // Load post types in dropdown if they exist (only if viewable and support editor feature)
      if (props.types) {
        var postSelections = [{ label: __('Choose Post Type', 'obb'), value: '' }]
        jQuery.each(props.types, function (key, val) {
          if (val.viewable && val.supports.editor) {
            // Remove Pages
            if (val.slug === 'page' || val.slug === 'product') {
              return
            }
            postSelections.push({ label: val.name, value: val.slug })
            if (posttype && posttype === val.slug) {
              taxonomies = val.taxonomies
            }
          }
        })

        postTypeBox = el(SelectControl, {
          className: 'obb-dropdown',
          label: __('Select a Post Type', 'obb'),
          value: posttype,
          options: postSelections,
          onChange: function (val) { props.setAttributes({ posttype: val, posttaxonomy: '' }) }
        })
      }

      // Load taxonomy dropdown if they exist
      if (taxonomies.length > 0) {
        postTaxonomies = [{ label: __('Choose a Taxonomy', 'obb'), value: '' }]
        jQuery.each(taxonomies, function (key, val) {
          postTaxonomies.push({ label: val, value: val })
        })

        taxonomyBox = el(SelectControl, {
          className: 'obb-dropdown',
          label: __('Select a Taxonomy', 'obb'),
          value: posttaxonomy,
          options: postTaxonomies,
          onChange: function (val) { props.setAttributes({ posttaxonomy: val }) }
        })
      } else {
        taxonomyBox = ''
      }

      // Add Category or products based on post type chosen
      var catlabel = __('Select a Category', 'obb')
      if (posttype === 'page' && props.pages) {
        postCategories = []
        catlabel = __('Choose Pages', 'obb')
        jQuery.each(props.pages, function (key, val) {
          postCategories.push({ label: val.title.rendered, value: val.id })
        })
      } else if (posttype === 'jetpack-testimonial' && props.testimonials) {
        postCategories = []
        catlabel = __('Choose Testimonials', 'obb')
        jQuery.each(props.testimonials, function (key, val) {
          postCategories.push({ label: val.title.rendered, value: val.id })
        })
      } else if (props.categories) {
        postCategories = []
        jQuery.each(props.categories, function (key, val) {
          postCategories.push({ label: val.name, value: val.name })
        })
      }

      if (props.pages || props.categories || props.testimonials) {
        categoryBox = el(SelectControl, {
          multiple: true,
          className: 'obb-dropdown obb-multi-select',
          label: catlabel,
          help: __('Hold "Control" or "Command" to select multiple options.', 'obb'),
          value: postcategory,
          options: postCategories,
          onChange: function (val) { props.setAttributes({ postcategory: val }) }
        })
      }

      /*  Test code for autocomplete box (not working)

        var autocompleters =       [{
                name: 'taxcategories',
                triggerPrefix: '~',
                options: [
                    {  name: 'Apple', id: 1 },
                    {  name: 'Orange', id: 2 },
                    {  name: 'Grapes', id: 3 },
                ],
                getOptionLabel: function(fruit) {
            return fruit.name;
                }
            }];

      var autoCompleteBox = el(
        RichText,
        {
            autocompleters:autocompleters,
            onChange: function (val) {props.setAttributes({postcategory:val})},
            value: "Apple"
        }

      );
       */

      // Show front end of plugin if not in edit mode
      var displayEditor = ''

      if (!editMode) {
        displayEditor = el(
          ServerSideRender,
          {
            block: 'obb/testimonial-block',
            className: 'organic-testimonial-block',
            attributes: {
              editMode: editMode,
              textalignment: textalignment,
              postbodysize: postbodysize,
              postauthorsize: postauthorsize,
              iconsize: iconsize,
              posttype: posttype,
              posttaxonomy: posttaxonomy,
              postcategory: postcategory,
              transspeed: transspeed,
              transstyle: transstyle,
              poststyle: poststyle,
              postorder: postorder,
              randomize: randomize,
              postsperslide: postsperslide,
              testimonialicon: testimonialicon,
              displaytitle: displaytitle,
              displayexcerpt: displayexcerpt,
              displaylink: displaylink,
              displaybg: displaybg,
              displaycontentbg: displaycontentbg,
              slidearrows: slidearrows,
              slidenav: slidenav,
              contentlayout: contentlayout,
              testimonialsize: testimonialsize,
              slidebgcolor: slidebgcolor,
              slidebggradient: slidebggradient,
              titlecolor: titlecolor,
              contentcolor: contentcolor,
              iconcolor: iconcolor,
              contentbgcolor: contentbgcolor,
              contentbggradient: contentbggradient
              // buttonhovercolor: buttonhovercolor
            }
          }
        )
      } else {
        displayEditor = el(
          Placeholder,
          {
            className: 'obb-setup'
          },
          el('div',
            {
              className: 'obb-setup-header'
            },
            el('div',
              {
                className: 'obb-setup-icon'
              },
              testimonialsIcon
            ),
            el(
              'h4',
              {
                className: 'obb-setup-title'
              },
              __('Testimonials', 'obb')
            ),
            el(
              'p',
              {
                className: 'obb-setup-description'
              },
              __('Display a slideshow of testimonials.', 'obb')
            )
          ),
          postTypeBox,
          taxonomyBox,
          categoryBox,
          el(
            Button,
            {
              className: 'is-button is-default is-secondary',
              onClick: function () { props.setAttributes({ editMode: false }) }
            },
            __('Done', 'obb')
          )
        )
      }

      // Return editor content and controls/settings
      return [
        el(
          BlockControls,
          { key: 'controls' },
          el(AlignmentToolbar, {
            value: textalignment,
            onChange: function (val) { props.setAttributes({ textalignment: val }) }
          }),
          el('div', { className: 'components-toolbar' },
            el(
              IconButton,
              {
                icon: 'edit',
                className: 'components-toolbar-button obb-toolbar-button',
                label: __('Done', 'obb'),
                onClick: function () { props.setAttributes({ editMode: !editMode }) }
              }
            )
          )
        ),
        displayEditor,
        el(
          InspectorControls,
          null,
          el(PanelBody,
            {
              title: __('Settings', 'obb')
            },
            el(SelectControl, {
              label: __('Transition Speed', 'obb'),
              value: transspeed,
              options: speedOptions,
              onChange: function (val) { props.setAttributes({ transspeed: val }) }
            }),
            el(SelectControl, {
              label: __('Transition Style', 'obb'),
              value: transstyle,
              options: styleOptions,
              onChange: function (val) { props.setAttributes({ transstyle: val }) }
            }),
            el(SelectControl, {
              label: __('Testimonials Post Order', 'obb'),
              value: postorder,
              options: orderOptions,
              onChange: function (val) { props.setAttributes({ postorder: val }) }
            }),
            el(ToggleControl, {
              label: __('Randomize Order', 'obb'),
              checked: randomize,
              onChange: function (val) { props.setAttributes({ randomize: val }) }
            }),
            el(RangeControl, {
              label: __('Posts Per Slide', 'obb'),
              max: 4,
              min: 1,
              step: 1,
              value: postsperslide,
              onChange: function (val) { props.setAttributes({ postsperslide: val }) }
            })
          ),
          el(PanelBody,
            {
              title: __('Display', 'obb'),
              initialOpen: true,
              icon: 'visibility'
            },
            el(SelectControl, {
              label: __('Testimonial Icon', 'obb'),
              value: testimonialicon,
              options: iconTypes,
              onChange: function (val) { props.setAttributes({ testimonialicon: val }) }
            }),
            el(ToggleControl, {
              label: __('Testimonial Excerpt', 'obb'),
              checked: displayexcerpt,
              onChange: function (val) { props.setAttributes({ displayexcerpt: val }) }
            }),
            el(ToggleControl, {
              label: __('Testimonial Author', 'obb'),
              checked: displaytitle,
              onChange: function (val) { props.setAttributes({ displaytitle: val }) }
            }),
            el(ToggleControl, {
              label: __('Testimonial Author Link', 'obb'),
              checked: displaylink,
              onChange: function (val) { props.setAttributes({ displaylink: val }) }
            }),
            el(ToggleControl, {
              label: __('Testimonial Background', 'obb'),
              checked: displaycontentbg,
              onChange: function (val) { props.setAttributes({ displaycontentbg: val }) }
            }),
            el(ToggleControl, {
              label: __('Slideshow Background', 'obb'),
              checked: displaybg,
              onChange: function (val) { props.setAttributes({ displaybg: val }) }
            }),
            el(ToggleControl, {
              label: __('Slideshow Directional Arrows', 'obb'),
              checked: slidearrows,
              onChange: function (val) { props.setAttributes({ slidearrows: val }) }
            }),
            el(ToggleControl, {
              label: __('Slideshow Navigation', 'obb'),
              checked: slidenav,
              onChange: function (val) { props.setAttributes({ slidenav: val }) }
            })
          ),
          el(PanelBody,
            {
              title: __('Layout', 'obb'),
              initialOpen: false,
              icon: 'move'
            },
            el(SelectControl, {
              label: __('Content Layout', 'obb'),
              value: contentlayout,
              options: layoutOptions,
              onChange: function (val) { props.setAttributes({ contentlayout: val }) }
            }),
            el(RangeControl, {
              label: __('Image Size', 'obb'),
              max: 480,
              min: 60,
              step: 10,
              value: testimonialsize,
              onChange: function (val) { props.setAttributes({ testimonialsize: val }) }
            })
          )
        ),
        el(
          InspectorControls, {
            group: 'styles',
          },
          el(PanelBody,
            {
              title: __('Legacy Styles', 'obb'),
              initialOpen: false
            },
            el(SelectControl, {
              label: __('Testimonials Style', 'obb'),
              value: poststyle,
              options: slideOptions,
              onChange: function (val) { props.setAttributes({ poststyle: val }) }
            }),
          ),
          el(PanelColorSettings, {
            title: __('Colors', 'obb'),
            initialOpen: false,
            enableAlpha: true,
            disableCustomColors: false,
            disableCustomGradients: false,
            colorSettings: [
              {
                label: __('Slideshow Background', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: slidebgcolor,
                gradientValue: slidebggradient,
                onChange: function (val) { props.setAttributes({ slidebgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ slidebggradient: val }) }
              },
              {
                label: __('Testimonial Background', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: contentbgcolor,
                gradientValue: contentbggradient,
                onChange: function (val) { props.setAttributes({ contentbgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ contentbggradient: val }) }
              },
              {
                colors: colorOptions,
                label: __('Icon Color', 'obb'),
                value: iconcolor,
                onChange: function (val) { props.setAttributes({ iconcolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Excerpt Color', 'obb'),
                value: contentcolor,
                onChange: function (val) { props.setAttributes({ contentcolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Author Color', 'obb'),
                value: titlecolor,
                onChange: function (val) { props.setAttributes({ titlecolor: val }) }
              }
            ]
          }),
          el(PanelBody,
            {
              title: __('Typography', 'obb')
            },
            el(BaseControl,
              {
                help: __('Change font size for testimonial excerpt.', 'obb')
              },
              el(UnitControl, {
                label: __('Slide Excerpt Size', 'obb'),
                type: 'number',
                units: unitTypes,
                value: postbodysize,
                onChange: function (val) { props.setAttributes({ postbodysize: val }) }
              })
            ),
            el(BaseControl,
              {
                help: __('Change font size for testimonial author.', 'obb')
              },
              el(UnitControl, {
                label: __('Testimonial Author Size', 'obb'),
                type: 'number',
                units: unitTypes,
                value: postauthorsize,
                onChange: function (val) { props.setAttributes({ postauthorsize: val }) }
              })
            ),
            el(BaseControl,
              {
                help: __('Change font size for testimonial icon.', 'obb')
              },
              el(UnitControl, {
                label: __('Testimonial Icon Size', 'obb'),
                type: 'number',
                units: unitTypes,
                value: iconsize,
                onChange: function (val) { props.setAttributes({ iconsize: val }) }
              })
            )
          ),
        )
      ]
    }),

    save: function (props) {
      return null
    }
  })
})(
  window.wp.data,
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.element,
  window.wp.i18n,
  window.wp.serverSideRender
)
