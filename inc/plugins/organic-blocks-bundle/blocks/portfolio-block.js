(function (data, blocks, editor, components, element, i18n, serverSideRender, apiFetch) {
  // Load Components
  var __ = i18n.__
  var el = element.createElement
  var withSelect = data.withSelect
  var useSetting = wp.blockEditor.useSetting
  var ServerSideRender = serverSideRender
  var BlockControls = wp.blockEditor.BlockControls
  var BlockAlignmentMatrixControl = wp.blockEditor.__experimentalBlockAlignmentMatrixControl
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar
  var InspectorControls = wp.blockEditor.InspectorControls
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var PanelBody = components.PanelBody
  var Placeholder = components.Placeholder
  var ToggleControl = components.ToggleControl
  var SelectControl = components.SelectControl
  var TextControl = components.TextControl
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
      gradient: 'linear-gradient(225deg, rgb(223, 212, 0), rgb(156, 0, 163) 100%)',
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
  var styleOptions = [
    { label: __('Minimal', 'obb'), value: 'minimal' },
    { label: __('Modern', 'obb'), value: 'modern' },
    { label: __('Rounded', 'obb'), value: 'rounded' },
    { label: __('Bordered', 'obb'), value: 'bordered' }
  ]
  var orderOptions = [
    { label: __('Ascending', 'obb'), value: 'ASC' },
    { label: __('Descending', 'obb'), value: 'DESC' }
  ]
  var layoutOptions = [
    { label: __('Content Overlay', 'obb'), value: 'position-overlay' },
    { label: __('Content Below Image', 'obb'), value: 'position-below-image' },
    { label: __('Content Above Image', 'obb'), value: 'position-above-image' }
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
  const portfolioIcon = el('svg',
    {
      class: 'organic-portfolio-icon',
      width: 24,
      height: 24
    },
    el('path',
      {
        fill: '#99cc33',
        d: 'M20 5c0-1.103-0.897-2-2-2 0-1.103-0.897-2-2-2h-8c-1.103 0-2 0.897-2 2-1.103 0-2 0.897-2 2-1.103 0-2 0.897-2 2v14c0 1.103 0.897 2 2 2h16c1.103 0 2-0.897 2-2v-14c0-1.103-0.897-2-2-2zM8 2h8c0.55 0 1 0.45 1 1h-10c0-0.55 0.45-1 1-1zM6 4h12c0.55 0 1 0.45 1 1h-14c0-0.55 0.45-1 1-1zM20 21h-16v-14h16v14c0.003 0 0 0 0 0z'
      }
    ),
    el('path',
      {
        fill: '#99cc33',
        d: 'M17.5 9h-11c-0.275 0-0.5 0.225-0.5 0.5v9c0 0.275 0.225 0.5 0.5 0.5h11c0.275 0 0.5-0.225 0.5-0.5v-9c0-0.275-0.225-0.5-0.5-0.5zM7 10h10v5.169l-0.584-0.584c-0.781-0.778-2.050-0.778-2.828 0l-3.416 3.416h-3.172v-8zM11.584 18l2.709-2.709c0.387-0.387 1.025-0.387 1.416 0l1.291 1.291v1.419h-5.416z'
      }
    ),
    el('path',
      {
        fill: '#99cc33',
        d: 'M11 12.5c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5zM9 12.5c0-0.275 0.225-0.5 0.5-0.5s0.5 0.225 0.5 0.5-0.225 0.5-0.5 0.5-0.5-0.225-0.5-0.5z'
      }
    )
  )

  // Register Block.
  const organicPortfolioBlock = blocks.registerBlockType('obb/portfolio-block', {
    title: __('Portfolio', 'obb'),
    description: __('Display a group of posts as a portfolio', 'obb'),
    icon: portfolioIcon,
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
      randomize: {
        type: 'boolean',
        default: false
      },
      portstyle: {
        type: 'string',
        default: 'minimal'
      },
      portlayout: {
        type: 'string',
        default: 'position-overlay'
      },
      portheading: {
        type: 'string',
        default: 'h4'
      },
      portheadingsize: {
        type: 'string',
        default: '24px'
      },
      portbodysize: {
        type: 'string',
        default: '16px'
      },
      porttitle: {
        type: 'boolean',
        default: true
      },
      portexcerpt: {
        type: 'boolean',
        default: true
      },
      portbutton: {
        type: 'boolean',
        default: true
      },
      portlink: {
        type: 'boolean',
        default: true
      },
      portcontent: {
        type: 'boolean',
        default: true
      },
      portpagination: {
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
      portcolumns: {
        type: 'number',
        default: 2
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
      porttitlecolor: {
        type: 'string',
        default: '#fff'
      },
      porttextcolor: {
        type: 'string',
        default: '#fff'
      },
      porticoncolor: {
        type: 'string',
        default: '#fff'
      },
      buttoncolor: {
        type: 'string',
        default: '#fff'
      },
      buttonbg: {
        type: 'string',
        default: ''
      },
      buttongradient: {
        type: 'string'
      },
      porthovercolor: {
        type: 'string',
        default: '#000'
      },
      porthoveropacity: {
        type: 'number',
        default: 0.5
      }
    },
    edit: withSelect(function (select, props) {
      // Load products & Categories based on Taxonomy and add to properties
      var taxonomy = props.attributes.posttaxonomy
      return {
        categories: select('core').getEntityRecords('taxonomy', taxonomy, { per_page: -1 }),
        types: select('core').getPostTypes({ per_page: -1 }),
        wooCats: wooCats
      }
    })(function (props) {
      // Load all attributes
      var postTypeBox = el(Spinner)
      var categoryBox = el(Spinner)
      var taxonomyBox = el(Spinner)
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var editMode = props.attributes.editMode
      var position = props.attributes.position
      var textalignment = props.attributes.textalignment
      var postcategory = props.attributes.postcategory
      var posttype = props.attributes.posttype
      var posttaxonomy = props.attributes.posttaxonomy
      var portstyle = props.attributes.portstyle
      var portlayout = props.attributes.portlayout
      var postorder = props.attributes.postorder
      var randomize = props.attributes.randomize
      var portheading = props.attributes.portheading
      var portheadingsize = props.attributes.portheadingsize
      var portbodysize = props.attributes.portbodysize
      var porttitle = props.attributes.porttitle
      var portexcerpt = props.attributes.portexcerpt
      var portbutton = props.attributes.portbutton
      var portlink = props.attributes.portlink
      var portcontent = props.attributes.portcontent
      var portpagination = props.attributes.portpagination
      var masonrylayout = props.attributes.masonrylayout
      var filternav = props.attributes.filternav
      var portcolumns = props.attributes.portcolumns
      var maxposts = props.attributes.maxposts
      var offset = props.attributes.offset
      var gutterwidth = props.attributes.gutterwidth
      var porttitlecolor = props.attributes.porttitlecolor
      var porttextcolor = props.attributes.porttextcolor
      var porticoncolor = props.attributes.porticoncolor
      var buttoncolor = props.attributes.buttoncolor
      var buttonbg = props.attributes.buttonbg
      var buttongradient = props.attributes.buttongradient
      var porthovercolor = props.attributes.porthovercolor
      var porthoveropacity = props.attributes.porthoveropacity
      var postCategories = []
      var taxonomies = []
      var postTaxonomies = []

      // Load post types in dropdown if they exist (only if viewable and support editor feature)
      if (props.types) {
        var postSelections = [{ label: __('Choose Post Type', 'obb'), value: '' }]
        jQuery.each(props.types, function (key, val) {
          if (val.viewable && val.supports.editor) {
            // Remove Pages
            if (val.slug === 'page') {
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
      }

      // Show front end of plugin if not in edit mode
      var displayEditor = ''

      if (!editMode) {
        displayEditor = el(
          ServerSideRender,
          {
            block: 'obb/portfolio-block',
            className: 'organic-portfolio-block',
            attributes: {
              editMode: editMode,
              position: position,
              posttype: posttype,
              posttaxonomy: posttaxonomy,
              postcategory: postcategory,
              portstyle: portstyle,
              textalignment: textalignment,
              portlayout: portlayout,
              postorder: postorder,
              randomize: randomize,
              portheading: portheading,
              portheadingsize: portheadingsize,
              portbodysize: portbodysize,
              porttitle: porttitle,
              portexcerpt: portexcerpt,
              portbutton: portbutton,
              portlink: portlink,
              portcontent: portcontent,
              portpagination: portpagination,
              masonrylayout: masonrylayout,
              filternav: filternav,
              portcolumns: portcolumns,
              maxposts: maxposts,
              offset: offset,
              gutterwidth: gutterwidth,
              porttitlecolor: porttitlecolor,
              porttextcolor: porttextcolor,
              porticoncolor: porticoncolor,
              buttoncolor: buttoncolor,
              buttonbg: buttonbg,
              buttongradient: buttongradient,
              porthovercolor: porthovercolor,
              porthoveropacity: porthoveropacity
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
              portfolioIcon
            ),
            el(
              'h4',
              {
                className: 'obb-setup-title'
              },
              __('Portfolio', 'obb')
            ),
            el(
              'p',
              {
                className: 'obb-setup-description'
              },
              __('Display a group of posts as a portfolio.', 'obb')
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
          el('div', { className: 'components-toolbar-group components-toolbar' },
            el(BlockAlignmentMatrixControl, {
              value: position,
              onChange: function (val) { props.setAttributes({ position: val }) }
            })
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
              label: __('Portfolio Style', 'obb'),
              value: portstyle,
              options: styleOptions,
              onChange: function (val) { props.setAttributes({ portstyle: val }) }
            }),
            el(SelectControl, {
              label: __('Portfolio Layout', 'obb'),
              value: portlayout,
              options: layoutOptions,
              onChange: function (val) { props.setAttributes({ portlayout: val }) }
            }),
            el(SelectControl, {
              label: __('Portfolio Order', 'obb'),
              value: postorder,
              options: orderOptions,
              onChange: function (val) { props.setAttributes({ postorder: val }) }
            }),
            el(ToggleControl, {
              label: __('Randomize Order', 'obb'),
              checked: randomize,
              onChange: function (val) { props.setAttributes({ randomize: val }) }
            }),
            el(TextControl, {
              label: __('Maximum Number Posts', 'obb'),
              type: 'number',
              min: 1,
              max: 999,
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
              label: __('Portfolio Heading', 'obb'),
              value: portheading,
              options: headingOptions,
              onChange: function (val) { props.setAttributes({ portheading: val }) }
            }),
            el(BaseControl,
              {
                help: __('Change font size for portfolio heading.', 'obb')
              },
              el(UnitControl, {
                label: __('Portfolio Heading Size', 'obb'),
                type: 'number',
                units: unitTypes,
                value: portheadingsize,
                onChange: function (val) { props.setAttributes({ portheadingsize: val }) }
              })
            ),
            el(BaseControl,
              {
                help: __('Change font size for portfolio excerpt.', 'obb')
              },
              el(UnitControl, {
                label: __('Portfolio Excerpt Size', 'obb'),
                type: 'number',
                units: unitTypes,
                value: portbodysize,
                onChange: function (val) { props.setAttributes({ portbodysize: val }) }
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
              label: __('Filter Portfolio By Taxonomy', 'obb'),
              checked: filternav,
              onChange: function (val) { props.setAttributes({ filternav: val }) }
            }),
            el(ToggleControl, {
              label: __('Portfolio Title', 'obb'),
              checked: porttitle,
              help: __('The portfolio title is visible.', 'obb'),
              onChange: function (val) { props.setAttributes({ porttitle: val }) }
            }),
            el(ToggleControl, {
              label: __('Portfolio Excerpt', 'obb'),
              checked: portexcerpt,
              help: __('The portfolio excerpt is visible.', 'obb'),
              onChange: function (val) { props.setAttributes({ portexcerpt: val }) }
            }),
            el(ToggleControl, {
              label: __('Pinterest Button', 'obb'),
              checked: portbutton,
              help: __('The Pinterest Pin It button is visible.', 'obb'),
              onChange: function (val) { props.setAttributes({ portbutton: val }) }
            }),
            el(ToggleControl, {
              label: __('Portfolio Link', 'obb'),
              checked: portlink,
              help: __('The portfolio image links to post.', 'obb'),
              onChange: function (val) { props.setAttributes({ portlink: val }) }
            }),
            el(ToggleControl, {
              label: __('Show Content On Hover', 'obb'),
              checked: portcontent,
              help: __('Content is only visible on hover.', 'obb'),
              onChange: function (val) { props.setAttributes({ portcontent: val }) }
            }),
            el(ToggleControl, {
              label: __('Portfolio Pagination', 'obb'),
              checked: portpagination,
              help: __('The portfolio pagination is visible.', 'obb'),
              onChange: function (val) { props.setAttributes({ portpagination: val }) }
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
              min: 1,
              max: 6,
              value: portcolumns,
              onChange: function (val) { props.setAttributes({ portcolumns: val }) }
            }),
            el(TextControl, {
              label: __('Gutter Width', 'obb'),
              type: 'number',
              min: 0,
              value: gutterwidth,
              onChange: function (val) { props.setAttributes({ gutterwidth: val }) }
            })
          ),
          el(PanelColorSettings, {
            title: __('Colors', 'obb'),
            initialOpen: true,
            enableAlpha: true,
            disableCustomColors: false,
            disableCustomGradients: false,
            colorSettings: [
              {
                colors: colorOptions,
                label: __('Title Color', 'obb'),
                value: porttitlecolor,
                onChange: function (val) { props.setAttributes({ porttitlecolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Excerpt Color', 'obb'),
                value: porttextcolor,
                onChange: function (val) { props.setAttributes({ porttextcolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Pin Icon Color', 'obb'),
                value: porticoncolor,
                onChange: function (val) { props.setAttributes({ porticoncolor: val }) }
              },
              (filternav === true) && (
                {
                  colors: colorOptions,
                  label: __('Button Text Color', 'obb'),
                  value: buttoncolor,
                  onChange: function (val) { props.setAttributes({ buttoncolor: val }) }
                },
                {
                  label: __('Button Background', 'obb'),
                  colors: colorOptions,
                  gradients: gradientOptions,
                  value: buttonbg,
                  gradientValue: buttongradient,
                  onChange: function (val) { props.setAttributes({ buttonbg: val }) },
                  onGradientChange: function (val) { props.setAttributes({ buttongradient: val }) }
                }
              ),
              {
                colors: colorOptions,
                label: __('Hover Overlay Background', 'obb'),
                value: porthovercolor,
                onChange: function (val) { props.setAttributes({ porthovercolor: val }) }
              }
            ]
          },
          el(RangeControl, {
            label: __('Hover Overlay Opacity', 'obb'),
            max: 1.0,
            min: 0.0,
            step: 0.01,
            value: porthoveropacity,
            onChange: function (val) { props.setAttributes({ porthoveropacity: val }) }
          }))
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
