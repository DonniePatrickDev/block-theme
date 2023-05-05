(function (data, blocks, editor, components, element, i18n, serverSideRender, apiFetch) {
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
  var ColorIndicator = components.ColorIndicator
  var PanelBody = components.PanelBody
  var Placeholder = components.Placeholder
  var ToggleControl = components.ToggleControl
  var SelectControl = components.SelectControl
  var BaseControl = components.BaseControl
  var TextControl = components.TextControl
  var RangeControl = components.RangeControl
  var CheckboxControl = components.CheckboxControl
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
  var orderOptions = [
    { label: __('Ascending', 'obb'), value: 'ASC' },
    { label: __('Descending', 'obb'), value: 'DESC' }
  ]
  var styleOptions = [
    { label: __('Minimal', 'obb'), value: 'minimal' },
    { label: __('Modern', 'obb'), value: 'modern' },
    { label: __('Angular', 'obb'), value: 'angular' },
    { label: __('Bordered', 'obb'), value: 'bordered' },
    { label: __('Rounded', 'obb'), value: 'rounded' }
  ]
  var orientationOptions = [
    { label: __('Horizontal', 'obb'), value: 'horizontal' },
    { label: __('Vertical', 'obb'), value: 'vertical' }
  ]
  var headingOptions = [
    { label: __('Heading 1', 'obb'), value: 'h1' },
    { label: __('Heading 2', 'obb'), value: 'h2' },
    { label: __('Heading 3', 'obb'), value: 'h3' },
    { label: __('Heading 4', 'obb'), value: 'h4' },
    { label: __('Heading 5', 'obb'), value: 'h5' },
    { label: __('Heading 6', 'obb'), value: 'h6' }
  ]
  var unitTypes = [
    { value: 'px', label: 'px' },
    { value: 'em', label: 'em' },
    { value: 'rem', label: 'rem' }
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
    console.log(err.stack)
  })

  // Create custom Posts icon SVG.
  const postsIcon = el('svg',
    {
      class: 'organic-posts-icon',
      width: 24,
      height: 24
    },
    el('path',
      {
        fill: '#99cc33',
        d: 'M22.5 7h-3.5v-2c0-1.103-0.897-2-2-2h-14c-1.103 0-2 0.897-2 2v13c0 1.653 1.347 3 3 3h16c0.794 0 1.541-0.306 2.106-0.866 0.575-0.569 0.894-1.325 0.894-2.134v-10.5c0-0.275-0.225-0.5-0.5-0.5zM4 19c-0.55 0-1-0.45-1-1v-13h14v12.969c0 0.359 0.063 0.706 0.181 1.031h-13.181zM21 18c0 0.269-0.106 0.522-0.297 0.712s-0.447 0.291-0.716 0.288c-0.544-0.006-0.987-0.469-0.987-1.031v-9.969h2v10z'
      }
    ),
    el('path',
      {
        fill: '#99cc33',
        d: 'M15.5 6h-11c-0.275 0-0.5 0.225-0.5 0.5v4c0 0.275 0.225 0.5 0.5 0.5h11c0.275 0 0.5-0.225 0.5-0.5v-4c0-0.275-0.225-0.5-0.5-0.5zM15 10h-10v-3h10v3z'
      }
    ),
    el('path',
      {
        fill: '#99cc33',
        d: 'M4 12h11v1h-11v-1z'
      }
    ),
    el('path',
      {
        fill: '#99cc33',
        d: 'M4 14h9v1h-9v-1z'
      }
    ),
    el('path',
      {
        fill: '#99cc33',
        d: 'M4 16h11v1h-11v-1z'
      }
    )
  )

  // Register Block.
  const organicPostBlock = blocks.registerBlockType('obb/post-block', {
    title: __('Posts', 'obb'),
    description: __('Display a group of featured posts.', 'obb'),
    icon: postsIcon,
    category: 'organic-blocks',
    supports: {
      align: ['wide', 'full'],
      anchor: true
      // spacing: { // Requires add_theme_support('custom-spacing');
      //   margin: true, // Enable margin UI control.
      //   padding: true // Enable padding UI control.
      // }
    },
    styles: [
      {
        name: 'obb-post-layout-primary',
        label: __('Primary', 'obb'),
        isDefault: true
      },
      {
        name: 'obb-post-layout-secondary',
        label: __('Secondary', 'obb')
      }
    ],
    attributes: {
      editMode: {
        type: 'boolean',
        default: true
      },
      className: {
        type: 'string'
      },
      textalignment: {
        type: 'string',
        default: 'center'
      },
      pageid: {
        type: 'array'
        // default: []
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
      postorder: {
        type: 'string',
        default: 'DESC'
      },
      poststyle: {
        type: 'string',
        default: 'minimal'
      },
      postorientation: {
        type: 'string',
        default: 'vertical'
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
      postimage: {
        type: 'boolean',
        default: true
      },
      postdate: {
        type: 'boolean',
        default: true
      },
      postauthor: {
        type: 'boolean',
        default: true
      },
      postcat: {
        type: 'boolean',
        default: true
      },
      posttitle: {
        type: 'boolean',
        default: true
      },
      postexcerpt: {
        type: 'boolean',
        default: true
      },
      postlink: {
        type: 'boolean',
        default: true
      },
      postbackground: {
        type: 'boolean',
        default: true
      },
      postpagination: {
        type: 'boolean',
        default: true
      },
      masonrylayout: {
        type: 'boolean',
        default: true
      },
      filternav: {
        type: 'boolean',
        default: false
      },
      postcolumns: {
        type: 'number',
        default: 3
      },
      maxposts: {
        type: 'string',
        default: '12'
      },
      offset: {
        type: 'string',
        default: ''
      },
      gutterwidth: {
        type: 'string',
        default: '24'
      },
      posttitlecolor: {
        type: 'string',
        default: ''
      },
      posttextcolor: {
        type: 'string',
        default: ''
      },
      postlinkcolor: {
        type: 'string',
        default: ''
      },
      btntextcolor: {
        type: 'string',
        default: ''
      },
      postbgcolor: {
        type: 'string',
        default: 'transparent'
      },
      postbggradient: {
        type: 'string'
      },
      buttoncolor: {
        type: 'string',
        default: ''
      },
      buttongradient: {
        type: 'string'
      }
    },
    edit: withSelect(function (select, props) {
      // Load products & Categories based on Taxonomy and add to properties
      var taxonomy = props.attributes.posttaxonomy
      return {
        pages: select('core').getEntityRecords('postType', 'page', { per_page: -1 }),
        categories: select('core').getEntityRecords('taxonomy', taxonomy, { per_page: -1 }),
        types: select('core').getPostTypes({ per_page: -1 }),
        wooCats: wooCats
      }
    })(function (props) {
      // Load all attributes
      var pagesBox = el(Spinner)
      var postTypeBox = el(Spinner)
      var categoryBox = el(Spinner)
      var taxonomyBox = el(Spinner)
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var editMode = props.attributes.editMode
      var className = props.attributes.className
      var textalignment = props.attributes.textalignment
      var postcategory = props.attributes.postcategory
      var pageid = props.attributes.pageid || []
      var posttype = props.attributes.posttype
      var posttaxonomy = props.attributes.posttaxonomy
      var poststyle = props.attributes.poststyle
      var postorientation = props.attributes.postorientation
      var postorder = props.attributes.postorder
      var postheading = props.attributes.postheading
      var postheadingsize = props.attributes.postheadingsize
      var postbodysize = props.attributes.postbodysize
      var postimage = props.attributes.postimage
      var postdate = props.attributes.postdate
      var postauthor = props.attributes.postauthor
      var postcat = props.attributes.postcat
      var posttitle = props.attributes.posttitle
      var postexcerpt = props.attributes.postexcerpt
      var postlink = props.attributes.postlink
      var postbackground = props.attributes.postbackground
      var postpagination = props.attributes.postpagination
      var masonrylayout = props.attributes.masonrylayout
      var filternav = props.attributes.filternav
      var postcolumns = props.attributes.postcolumns
      var maxposts = props.attributes.maxposts
      var offset = props.attributes.offset
      var gutterwidth = props.attributes.gutterwidth
      var posttitlecolor = props.attributes.posttitlecolor
      var posttextcolor = props.attributes.posttextcolor
      var postlinkcolor = props.attributes.postlinkcolor
      var btntextcolor = props.attributes.btntextcolor
      var postbgcolor = props.attributes.postbgcolor
      var postbggradient = props.attributes.postbggradient
      var buttoncolor = props.attributes.buttoncolor
      var buttongradient = props.attributes.buttongradient
      var searchtext = props.attributes.searchtext
      var searchInput = ''
      var postCategories = []
      var taxonomies = []
      var postTaxonomies = []
      var postdata = pageid
      var checkboxes = []

      // Load post types in dropdown if they exist (only if viewable and support editor feature)
      if (props.types) {
        var postSelections = [{ label: __('Choose Post Type', 'obb'), value: '' }]
        jQuery.each(props.types, function (key, val) {
          if (val.viewable && val.supports.editor) {
            // Remove Pages
            // if (val.slug === 'page') {
            //   return
            // }
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

      if (posttype === 'page' && props.pages) {
        searchInput = el('input', {
          value: searchtext,
          onChange: function (event) {
            props.setAttributes({ searchtext: event.target.value, pageid: [] })
          },
          placeholder: __('Search Pages', 'obb'),
          type: 'text'
        })

        jQuery.each(props.pages, function (key, val) {
          var checked = postdata.indexOf(val.id) > -1
          var title = val.title.rendered
          // Check if search text matches page title...if not, remove page title
          if (searchtext && searchtext !== '') {
            if (title.indexOf(searchtext) === -1) {
              return true
            }
          }
          // console.log(postdata)
          checkboxes.push(
            el(CheckboxControl, {
              className: 'obb-checkbox',
              label: val.title.rendered,
              checked: checked,
              onChange: function (value) {
                if (value) {
                  if (postdata.indexOf(val.id) === -1) {
                    postdata.push(val.id)
                    postdata = postdata.filter((v) => v)
                  }
                } else {
                  // postdata.splice(jQuery.inArray(val.id, postdata), 1)
                  postdata = postdata.filter((v) => v !== val.id)
                }
                props.setAttributes({ pageid: postdata, checked: value })
              }
            })
          )
        })

        pagesBox = el('div', { className: 'obb-dropdown' },
          // searchInput, // Disable until case insensitive
          el('div', { className: 'obb-select-list components-menu-group' },
            checkboxes
          )
        )
      } else {
        pagesBox = ''
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
      if (posttype === 'product' && props.wooCats) {
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

      if (props.categories) {
        categoryBox = el(SelectControl, {
          multiple: true,
          className: 'obb-dropdown obb-multi-select',
          label: catlabel,
          help: __('Hold "Control" or "Command" to select multiple options.', 'obb'),
          value: postcategory,
          options: postCategories,
          onChange: function (val) { props.setAttributes({ postcategory: val }) }
        })
      } else {
        categoryBox = ''
      }

      // Show front end of plugin if not in edit mode
      var displayEditor = ''

      if (!editMode) {
        displayEditor = el(
          ServerSideRender,
          {
            block: 'obb/post-block',
            className: 'organic-post-block',
            attributes: {
              editMode: editMode,
              className: className,
              posttype: posttype,
              pageid: pageid,
              posttaxonomy: posttaxonomy,
              postcategory: postcategory,
              poststyle: poststyle,
              postorientation: postorientation,
              textalignment: textalignment,
              postorder: postorder,
              postheading: postheading,
              postheadingsize: postheadingsize,
              postbodysize: postbodysize,
              postimage: postimage,
              postdate: postdate,
              postauthor: postauthor,
              postcat: postcat,
              posttitle: posttitle,
              postexcerpt: postexcerpt,
              postlink: postlink,
              postbackground: postbackground,
              postpagination: postpagination,
              masonrylayout: masonrylayout,
              filternav: filternav,
              postcolumns: postcolumns,
              maxposts: maxposts,
              offset: offset,
              gutterwidth: gutterwidth,
              posttitlecolor: posttitlecolor,
              posttextcolor: posttextcolor,
              postlinkcolor: postlinkcolor,
              btntextcolor: btntextcolor,
              postbgcolor: postbgcolor,
              postbggradient: postbggradient,
              buttoncolor: buttoncolor,
              buttongradient: buttongradient
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
              postsIcon
            ),
            el(
              'h4',
              {
                className: 'obb-setup-title'
              },
              __('Posts', 'obb')
            ),
            el(
              'p',
              {
                className: 'obb-setup-description'
              },
              __('Display a group of featured posts.', 'obb')
            )
          ),
          postTypeBox,
          pagesBox,
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
              label: __('Post Style', 'obb'),
              value: poststyle,
              options: styleOptions,
              onChange: function (val) { props.setAttributes({ poststyle: val }) }
            }),
            el(SelectControl, {
              label: __('Post Orientation', 'obb'),
              value: postorientation,
              options: orientationOptions,
              onChange: function (val) { props.setAttributes({ postorientation: val }) }
            }),
            el(SelectControl, {
              label: __('Post Order', 'obb'),
              value: postorder,
              options: orderOptions,
              onChange: function (val) { props.setAttributes({ postorder: val }) }
            }),
            el(TextControl, {
              label: __('Maximum Number Posts', 'obb'),
              type: 'number',
              min: 1,
              value: maxposts,
              onChange: function (val) { props.setAttributes({ maxposts: val }) }
            }),
            el(TextControl, {
              label: __('Offset Posts', 'obb'),
              type: 'number',
              min: 0,
              max: 999,
              value: offset,
              onChange: function (val) { props.setAttributes({ offset: val }) }
            })
          ),
          el(PanelBody,
            {
              title: __('Typography', 'obb')
            },
            el(SelectControl, {
              label: __('Post Heading', 'obb'),
              value: postheading,
              options: headingOptions,
              onChange: function (val) { props.setAttributes({ postheading: val }) }
            }),
            el(BaseControl,
              {
                help: __('Change font size for post heading.', 'obb')
              },
              el(UnitControl, {
                label: __('Post Heading Size', 'obb'),
                type: 'number',
                units: unitTypes,
                value: postheadingsize,
                onChange: function (val) { props.setAttributes({ postheadingsize: val }) }
              })
            ),
            el(BaseControl,
              {
                help: __('Change font size for post body.', 'obb')
              },
              el(UnitControl, {
                label: __('Post Body Size', 'obb'),
                type: 'number',
                units: unitTypes,
                value: postbodysize,
                onChange: function (val) { props.setAttributes({ postbodysize: val }) }
              })
            )
          ),
          el(PanelBody,
            {
              title: __('Display', 'obb'),
              initialOpen: false,
              icon: 'visibility'
            },
            el(ToggleControl, {
              label: __('Filter Posts By Taxonomy', 'obb'),
              help: __('Note: Masonry Layout must be enabled.', 'obb'),
              checked: filternav,
              onChange: function (val) { props.setAttributes({ filternav: val }) }
            }),
            el(ToggleControl, {
              label: __('Post Image', 'obb'),
              checked: postimage,
              onChange: function (val) { props.setAttributes({ postimage: val }) }
            }),
            el(ToggleControl, {
              label: __('Post Date', 'obb'),
              checked: postdate,
              onChange: function (val) { props.setAttributes({ postdate: val }) }
            }),
            el(ToggleControl, {
              label: __('Post Author', 'obb'),
              checked: postauthor,
              onChange: function (val) { props.setAttributes({ postauthor: val }) }
            }),
            el(ToggleControl, {
              label: __('Post Category', 'obb'),
              checked: postcat,
              onChange: function (val) { props.setAttributes({ postcat: val }) }
            }),
            el(ToggleControl, {
              label: __('Post Title', 'obb'),
              checked: posttitle,
              onChange: function (val) { props.setAttributes({ posttitle: val }) }
            }),
            el(ToggleControl, {
              label: __('Post Excerpt', 'obb'),
              checked: postexcerpt,
              onChange: function (val) { props.setAttributes({ postexcerpt: val }) }
            }),
            el(ToggleControl, {
              label: __('Post Link', 'obb'),
              checked: postlink,
              onChange: function (val) { props.setAttributes({ postlink: val }) }
            }),
            el(ToggleControl, {
              label: __('Post Pagination', 'obb'),
              checked: postpagination,
              onChange: function (val) { props.setAttributes({ postpagination: val }) }
            }),
            el(ToggleControl, {
              label: __('Post Background', 'obb'),
              checked: postbackground,
              onChange: function (val) { props.setAttributes({ postbackground: val }) }
            })
          ),
          el(PanelBody,
            {
              title: __('Layout', 'obb'),
              initialOpen: false,
              icon: 'move'
            },
            el(ToggleControl, {
              label: __('Masonry Layout', 'obb'),
              checked: masonrylayout,
              onChange: function (val) { props.setAttributes({ masonrylayout: val }) }
            }),
            el(RangeControl, {
              label: __('Columns', 'obb'),
              max: 6,
              min: 1,
              step: 1,
              value: postcolumns,
              onChange: function (val) { props.setAttributes({ postcolumns: val }) }
            }),
            el(TextControl, {
              label: __('Gutter Width (px)', 'obb'),
              type: 'number',
              min: 0,
              value: gutterwidth,
              onChange: function (val) { props.setAttributes({ gutterwidth: val }) }
            })
          ),
          el(PanelColorSettings, {
            title: __('Colors', 'obb'),
            initialOpen: false,
            enableAlpha: true,
            disableCustomColors: false,
            disableCustomGradients: false,
            colorSettings: [
              {
                label: __('Background', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: postbgcolor,
                gradientValue: postbggradient,
                onChange: function (val) { props.setAttributes({ postbgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ postbggradient: val }) }
              },
              {
                colors: colorOptions,
                label: __('Title Color', 'obb'),
                value: posttitlecolor,
                onChange: function (val) { props.setAttributes({ posttitlecolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Text Color', 'obb'),
                value: posttextcolor,
                onChange: function (val) { props.setAttributes({ posttextcolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Link Color', 'obb'),
                value: postlinkcolor,
                onChange: function (val) { props.setAttributes({ postlinkcolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Button Text Color', 'obb'),
                value: btntextcolor,
                onChange: function (val) { props.setAttributes({ btntextcolor: val }) }
              },
              {
                label: __('Button Background', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: buttoncolor,
                gradientValue: buttongradient,
                onChange: function (val) { props.setAttributes({ buttoncolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ buttongradient: val }) }
              }
            ]
          })
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
