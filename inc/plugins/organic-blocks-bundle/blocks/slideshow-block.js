(function (data, blocks, editor, components, element, i18n, serverSideRender, apiFetch) {
  // Load Components
  var __ = i18n.__
  var el = element.createElement
  var withSelect = data.withSelect
  var useSetting = wp.blockEditor.useSetting
  var ServerSideRender = serverSideRender
  var BlockControls = wp.blockEditor.BlockControls
  var BlockAlignmentMatrixControl = wp.blockEditor.__experimentalBlockAlignmentMatrixControl
  var ColorGradientControl = wp.blockEditor.__experimentalColorGradientControl
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar
  var InspectorControls = wp.blockEditor.InspectorControls
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var ColorPalette = components.ColorPalette
  var ColorIndicator = components.ColorIndicator
  var PanelBody = components.PanelBody
  var Placeholder = components.Placeholder
  var ToggleControl = components.ToggleControl
  var SelectControl = components.SelectControl
  var TextControl = components.TextControl
  var BaseControl = components.BaseControl
  var UnitControl = components.__experimentalUnitControl
  var RangeControl = components.RangeControl
  var Spinner = components.Spinner
  var Button = components.Button
  var IconButton = components.IconButton
  // var useSelect = data.useSelect

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
    { label: __('Bordered', 'obb'), value: 'style-bordered' },
    { label: __('Framed', 'obb'), value: 'style-framed' }
  ]
  var orderOptions = [
    { label: __('Ascending', 'obb'), value: 'ASC' },
    { label: __('Descending', 'obb'), value: 'DESC' }
  ]
  var headingOptions = [
    { label: __('Heading 1', 'obb'), value: 'h1' },
    { label: __('Heading 2', 'obb'), value: 'h2' },
    { label: __('Heading 3', 'obb'), value: 'h3' },
    { label: __('Heading 4', 'obb'), value: 'h4' },
    { label: __('Heading 5', 'obb'), value: 'h5' },
    { label: __('Heading 6', 'obb'), value: 'h6' }
  ]
  var layoutOptions = [
    { label: __('Content Overlay', 'obb'), value: 'obb-content-layout-overlay' },
    { label: __('Content Above Image', 'obb'), value: 'obb-content-layout-top' },
    { label: __('Content Below Image', 'obb'), value: 'obb-content-layout-bottom' }
  ]
  var unitTypes = [
    { value: 'px', label: 'px' },
    { value: 'em', label: 'em' },
    { value: 'rem', label: 'rem' },
    { value: 'vh', label: 'vh' },
    { value: 'vw', label: 'vw' }
  ]

  // Load WooCommerce categories.
  var wooCats = []
  var wooCall = apiFetch({ path: '/wc/v2/products/categories' }).then(cats => {
    var catsArr = []
    jQuery.each(cats, function (key, val) {
      catsArr.push({ name: val.name })
    })
    wooCats = catsArr
    return catsArr
  }).catch(err => {
    // return false
    console.log(err.stack)
  })

  // Create custom Organic Leaf logo SVG.
  const leafIcon = el('svg',
    {
      class: 'organic-logo',
      width: 20,
      height: 20
    },
    el('path',
      {
        fill: '#99cc33',
        d: 'M12.2,0C8.08,0,5.03,0.97,3.14,2.89C-1.19,7.28,0.26,12,0.81,13.34c0.48,1.18,1.08,1.92,1.53,2.32l1.57-1.39L3.77,7.28l1.6,5.71l2.33-2.06l0.23-5.69l1.01,4.59l5.61-4.49l-4.42,5.73l4.56,1.03l-5.64,0.24L7.04,14.7l5.65,1.62l-6.91-0.15l-1.34,1.57c0.05,0.06,0.1,0.12,0.17,0.18C5.62,18.96,7.75,20,10.22,20c1.73,0,4.32-0.53,6.8-3.05c4.3-4.36,2.6-13.66,2.05-16.15C17.89,0.53,15.18,0,12.2,0L12.2,0L12.2,0z'
      }
    )
  )
  blocks.updateCategory('organic-blocks', { icon: leafIcon })

  // Create custom Content Slideshow icon SVG.
  const sliderIcon = el('svg',
    {
      class: 'organic-slider-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M6.5,15h11c0.3,0,0.5-0.2,0.5-0.5v-8C18,6.2,17.8,6,17.5,6h-11C6.2,6,6,6.2,6,6.5v8C6,14.8,6.2,15,6.5,15z M17,14h-5.4v0l2.7-2.7c0.4-0.4,1-0.4,1.4,0l1.3,1.3V14z M7,7L7,7l10,0v4.2l-0.6-0.6c-0.8-0.8-2-0.8-2.8,0L10.2,14H7V7z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M12,9.5C12,8.7,11.3,8,10.5,8S9,8.7,9,9.5S9.7,11,10.5,11S12,10.3,12,9.5z M10,9.5C10,9.2,10.2,9,10.5,9S11,9.2,11,9.5S10.8,10,10.5,10S10,9.8,10,9.5z'
        }
      ),
      el('rect',
        {
          fill: '#99cc33',
          x: 6,
          y: 17,
          width: 12,
          height: 1
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M23,4h-1v0c0-1.1-0.9-2-2-2H4C2.9,2,2,2.9,2,4v0H1C0.4,4,0,4.5,0,5v14c0,0.6,0.4,1,1,1h1c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2h1c0.6,0,1-0.4,1-1V5C24,4.5,23.6,4,23,4z M1,19V5h1v14H1z M20,20H4V4h16V20z M23,19h-1V5h1V19z'
        }
      )
    )
  )

  // Register Block.
  const organicSlideshowBlock = blocks.registerBlockType('obb/slideshow-block', {
    title: __('Content Slideshow', 'obb'),
    description: __('Display a slideshow of selected posts or pages', 'obb'),
    icon: sliderIcon,
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
      position: {
        type: 'string',
        default: 'center center'
      },
      textalignment: {
        type: 'string',
        default: 'center'
      },
      postheading: {
        type: 'string',
        default: 'h4'
      },
      postheadingsize: {
        type: 'string',
        default: '24px'
      },
      postbodysize: {
        type: 'string',
        default: '16px'
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
      slidestyle: {
        type: 'string',
        default: 'style-minimal'
      },
      postorder: {
        type: 'string',
        default: 'DESC'
      },
      postsperslide: {
        type: 'number',
        default: 1
      },
      smoothheight: {
        type: 'boolean',
        default: true
      },
      slideheight: {
        type: 'string',
        default: '640px'
      },
      slidetitle: {
        type: 'boolean',
        default: true
      },
      slideexcerpt: {
        type: 'boolean',
        default: true
      },
      slidelink: {
        type: 'boolean',
        default: true
      },
      slidebackground: {
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
      slidelayout: {
        type: 'string',
        default: 'obb-content-layout-overlay'
      },
      slidebgcolor: {
        type: 'string',
        default: 'transparent'
      },
      slidebggradient: {
        type: 'string'
      },
      slideoverlaycolor: {
        type: 'string',
        default: '#000'
      },
      slideopacity: {
        type: 'number',
        default: 0.5
      },
      slidetitlecolor: {
        type: 'string',
        default: '#000'
      },
      slidecontentcolor: {
        type: 'string',
        default: '#666'
      },
      contentbgcolor: {
        type: 'string',
        default: '#fff'
      },
      contentbggradient: {
        type: 'string'
      },
      buttontxtcolor: {
        type: 'string',
        default: '#fff'
      },
      buttoncolor: {
        type: 'string',
        default: ''
      },
      buttontxt: {
        type: 'string',
        default: __('Read More', 'obb')
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
        types: select('core').getPostTypes({ per_page: -1 }),
        wooCats: wooCats
      }
    })(function (props) {
      // Load all attributes
      var postTypeBox = el(Spinner)
      var categoryBox = el(Spinner)
      var taxonomyBox = el(Spinner)
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var editMode = props.attributes.editMode
      var position = props.attributes.position
      var textalignment = props.attributes.textalignment
      var postheading = props.attributes.postheading
      var postheadingsize = props.attributes.postheadingsize
      var postbodysize = props.attributes.postbodysize
      var postcategory = props.attributes.postcategory
      var posttype = props.attributes.posttype
      var posttaxonomy = props.attributes.posttaxonomy
      var transspeed = props.attributes.transspeed
      var transstyle = props.attributes.transstyle
      var slidestyle = props.attributes.slidestyle
      var postorder = props.attributes.postorder
      var postsperslide = props.attributes.postsperslide
      var smoothheight = props.attributes.smoothheight
      var slideheight = props.attributes.slideheight
      var slidetitle = props.attributes.slidetitle
      var slideexcerpt = props.attributes.slideexcerpt
      var slidelink = props.attributes.slidelink
      var slidebackground = props.attributes.slidebackground
      var slidearrows = props.attributes.slidearrows
      var slidenav = props.attributes.slidenav
      var slidelayout = props.attributes.slidelayout
      var slidebgcolor = props.attributes.slidebgcolor
      var slidebggradient = props.attributes.slidebggradient
      var slideoverlaycolor = props.attributes.slideoverlaycolor
      var slideopacity = props.attributes.slideopacity
      var slidetitlecolor = props.attributes.slidetitlecolor
      var slidecontentcolor = props.attributes.slidecontentcolor
      var contentbgcolor = props.attributes.contentbgcolor
      var contentbggradient = props.attributes.contentbggradient
      var buttoncolor = props.attributes.buttoncolor
      var buttontxtcolor = props.attributes.buttontxtcolor
      var buttontxt = props.attributes.buttontxt
      // var buttonhovercolor = props.attributes.buttonhovercolor
      var postCategories = []
      var taxonomies = []
      var postTaxonomies = []

      // data.subscribe(function () {
      //   var el = document // This can be your element on which to trigger the event
      //   var event = document.createEvent('HTMLEvents')
      //   var isSuccess = data.select('core/editor').didPostSaveRequestSucceed()
      //   // var isSavingPost = wp.data.select('core/editor').isSavingPost()
      //   var isAutosavingPost = data.select('core/editor').isAutosavingPost()
      //   var contentChanged = data.select('core/editor').hasChangedContent()
      //   console.log('Content Changed:' + contentChanged)
      //   console.log('Autosaving:' + isAutosavingPost)
      //   if (isSuccess || isAutosavingPost || contentChanged) {
      //     setTimeout(function () {
      //       event.initEvent('resize', true, false)
      //       el.dispatchEvent(event)
      //     }, 500)
      //   }
      // })

      // Load post types in dropdown if they exist (only if viewable and support editor feature)
      if (props.types) {
        var postSelections = [{ label: __('Choose Post Type', 'obb'), value: '' }]
        jQuery.each(props.types, function (key, val) {
          if (val.viewable && val.supports.editor) {
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
      } else if (posttype === 'product' && props.wooCats) {
        postCategories = []
        jQuery.each(props.wooCats, function (key, val) {
          postCategories.push({ label: val.name, value: val.name })
        })
      } else if (props.categories) {
        postCategories = []
        jQuery.each(props.categories, function (key, val) {
          postCategories.push({ label: val.name, value: val.name })
        })
      }

      if (props.pages || props.categories) {
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

      // Show front end of plugin if not in edit mode
      var displayEditor = ''

      if (!editMode) {
        displayEditor = el(
          ServerSideRender,
          {
            block: 'obb/slideshow-block',
            className: 'organic-slideshow-block',
            attributes: {
              editMode: editMode,
              position: position,
              textalignment: textalignment,
              postheading: postheading,
              postheadingsize: postheadingsize,
              postbodysize: postbodysize,
              posttype: posttype,
              posttaxonomy: posttaxonomy,
              postcategory: postcategory,
              transspeed: transspeed,
              transstyle: transstyle,
              slidestyle: slidestyle,
              postorder: postorder,
              postsperslide: postsperslide,
              smoothheight: smoothheight,
              slideheight: slideheight,
              slidetitle: slidetitle,
              slideexcerpt: slideexcerpt,
              slidelink: slidelink,
              slidebackground: slidebackground,
              slidearrows: slidearrows,
              slidenav: slidenav,
              slidelayout: slidelayout,
              slidebgcolor: slidebgcolor,
              slidebggradient: slidebggradient,
              slideoverlaycolor: slideoverlaycolor,
              slideopacity: slideopacity,
              slidetitlecolor: slidetitlecolor,
              slidecontentcolor: slidecontentcolor,
              contentbgcolor: contentbgcolor,
              contentbggradient: contentbggradient,
              buttontxtcolor: buttontxtcolor,
              buttontxt: buttontxt,
              buttoncolor: buttoncolor
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
              sliderIcon
            ),
            el(
              'h4',
              {
                className: 'obb-setup-title'
              },
              __('Content Slideshow', 'obb')
            ),
            el(
              'p',
              {
                className: 'obb-setup-description'
              },
              __('Display a slideshow of posts or pages', 'obb')
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
        el(BlockControls,
          { key: 'controls' },
          el(AlignmentToolbar, {
            value: textalignment,
            onChange: function (val) { props.setAttributes({ textalignment: val }) }
          }),
          (slidelayout === 'obb-content-layout-overlay') && (
            el('div', { className: 'components-toolbar-group components-toolbar' },
              el(BlockAlignmentMatrixControl, {
                value: position,
                onChange: function (val) { props.setAttributes({ position: val }) }
              })
            )
          ),
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
              label: __('Slideshow Layout', 'obb'),
              value: slidelayout,
              options: layoutOptions,
              onChange: function (val) { props.setAttributes({ slidelayout: val }) }
            }),
            el(BaseControl,
              {
                help: __('Set a custom height for your slideshow.', 'obb')
              },
              el(UnitControl, {
                label: __('Slideshow Height', 'obb'),
                type: 'number',
                units: unitTypes,
                value: slideheight,
                onChange: function (val) { props.setAttributes({ slideheight: val }) }
              })
            ),
            el(SelectControl, {
              label: __('Slideshow Post Order', 'obb'),
              value: postorder,
              options: orderOptions,
              onChange: function (val) { props.setAttributes({ postorder: val }) }
            }),
            el(RangeControl, {
              label: __('Posts Per Slide', 'obb'),
              max: 5,
              min: 1,
              step: 1,
              value: postsperslide,
              onChange: function (val) { props.setAttributes({ postsperslide: val }) }
            }),
            el(ToggleControl, {
              label: __('Smooth Height', 'obb'),
              checked: smoothheight,
              onChange: function (val) { props.setAttributes({ smoothheight: val }) }
            })
          ),
          el(PanelBody,
            {
              title: __('Display', 'obb'),
              initialOpen: true,
              icon: 'visibility'
            },
            el(RangeControl, {
              label: __('Slide Overlay Opacity', 'obb'),
              max: 1.0,
              min: 0.0,
              step: 0.01,
              value: slideopacity,
              onChange: function (val) { props.setAttributes({ slideopacity: val }) }
            }),
            el(ToggleControl, {
              label: __('Slide Title', 'obb'),
              checked: slidetitle,
              onChange: function (val) { props.setAttributes({ slidetitle: val }) }
            }),
            el(ToggleControl, {
              label: __('Slide Excerpt', 'obb'),
              checked: slideexcerpt,
              onChange: function (val) { props.setAttributes({ slideexcerpt: val }) }
            }),
            el(ToggleControl, {
              label: __('Slide Button', 'obb'),
              checked: slidelink,
              onChange: function (val) { props.setAttributes({ slidelink: val }) }
            }),
            (slidelink === true) && (
              el(TextControl, {
                label: __('Slide Button Text', 'obb'),
                help: __('Text displayed on slide button.', 'obb'),
                value: buttontxt,
                onChange: function (val) { props.setAttributes({ buttontxt: val }) }
              })
            ),
            el(ToggleControl, {
              label: __('Slide Content Background', 'obb'),
              checked: slidebackground,
              onChange: function (val) { props.setAttributes({ slidebackground: val }) }
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
              label: __('Slideshow Style', 'obb'),
              value: slidestyle,
              options: slideOptions,
              onChange: function (val) { props.setAttributes({ slidestyle: val }) }
            }),
          ),
          el(PanelColorSettings, {
            title: __('Colors', 'obb'),
            initialOpen: true,
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
                label: __('Slide Content Background', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: contentbgcolor,
                gradientValue: contentbggradient,
                onChange: function (val) { props.setAttributes({ contentbgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ contentbggradient: val }) }
              },
              {
                colors: colorOptions,
                label: __('Slide Overlay Color', 'obb'),
                value: slideoverlaycolor,
                onChange: function (val) { props.setAttributes({ slideoverlaycolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Slide Title Color', 'obb'),
                value: slidetitlecolor,
                onChange: function (val) { props.setAttributes({ slidetitlecolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Slide Excerpt Color', 'obb'),
                value: slidecontentcolor,
                onChange: function (val) { props.setAttributes({ slidecontentcolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Slide Button Text Color', 'obb'),
                value: buttontxtcolor,
                onChange: function (val) { props.setAttributes({ buttontxtcolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Slide Button Background', 'obb'),
                value: buttoncolor,
                onChange: function (val) { props.setAttributes({ buttoncolor: val }) }
              }
            ]
          }),
          el(PanelBody,
            {
              title: __('Typography', 'obb')
            },
            el(SelectControl, {
              label: __('Slide Heading', 'obb'),
              value: postheading,
              options: headingOptions,
              onChange: function (val) { props.setAttributes({ postheading: val }) }
            }),
            el(BaseControl,
              {
                help: __('Change font size for slide heading.', 'obb')
              },
              el(UnitControl, {
                label: __('Slide Heading Size', 'obb'),
                type: 'number',
                units: unitTypes,
                value: postheadingsize,
                onChange: function (val) { props.setAttributes({ postheadingsize: val }) }
              })
            ),
            el(BaseControl,
              {
                help: __('Change font size for slide excerpt.', 'obb')
              },
              el(UnitControl, {
                label: __('Slide Excerpt Size', 'obb'),
                type: 'number',
                units: unitTypes,
                value: postbodysize,
                onChange: function (val) { props.setAttributes({ postbodysize: val }) }
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
  window.wp.serverSideRender,
  window.wp.apiFetch
)
