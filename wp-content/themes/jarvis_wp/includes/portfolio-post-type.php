<?php
/* portfolio Custom Post Type */




function portfolio_register() {  

	global $smof_data;
	
	$labels = array(
		'name' => __( 'Listings', 'rocknrolla' ),
		'singular_name' => __( 'Listings Item', 'rocknrolla' ),
		'add_new' => __( 'Add New Item', 'rocknrolla' ),
		'add_new_item' => __( 'Add New Listing Item', 'rocknrolla' ),
		'edit_item' => __( 'Edit Listing Item', 'rocknrolla' ),
		'new_item' => __( 'Add New Listing Item', 'rocknrolla' ),
		'view_item' => __( 'View Item', 'rocknrolla' ),
		'search_items' => __( 'Search Listing', 'rocknrolla' ),
		'not_found' => __( 'No listings items found', 'rocknrolla' ),
		'not_found_in_trash' => __( 'No listings items found in trash', 'rocknrolla' )
	);
	
    $args = array(  
        'labels' => $labels, 
        'public' => true,  
        'show_ui' => true,  
        'capability_type' => 'post',  
        'hierarchical' => false,  
        'rewrite' => array('slug' => 'listing-item'), 
        'supports' => array('title', 'editor', 'thumbnail', 'comments')  
       );  
  
    register_post_type( 'listing' , $args );  
}  

	register_taxonomy(  
	'listings_filter', 'listing',  
	array(  
	    'hierarchical' => true,  
	    'labels' => array(
	    	'name' => __( 'Listing Categories', 'kratos' ),
	    	'singular_name' => __( 'Listing Category', 'kratos' ),
	    	'search_items' => __( 'Search Listing Categories', 'kratos' ),
	    	'popular_items' => __( 'Popular Listing Categories', 'kratos' ),
	    	'all_items' => __( 'All Listing Categories', 'kratos' ),
	    	'edit_item' => __( 'Edit Listing Category', 'kratos' ),
	    	'update_item' => __( 'Update Listing Category', 'kratos' ),
	    	'add_new_item' => __( 'Add New Listing Category', 'kratos' ),
	    	'new_item_name' => __( 'New Listing Category Name', 'kratos' ),
	    	'separate_items_with_commas' => __( 'Separate Listing Categories With Commas', 'kratos' ),
	    	'add_or_remove_items' => __( 'Add or Remove Listing Categories', 'kratos' ),
	    	'choose_from_most_used' => __( 'Choose From Most Used Listing Categories', 'kratos' ),  
	    	'parent' => __( 'Parent Listing Category', 'kratos' )      	
	    	),
	    'query_var' => true,  
	    'rewrite' => true  
		)  
	);

/**
 * Add Columns to Portfolio Edit Screen
 * http://wptheming.com/2010/07/column-edit-pages/
 */
 
function portfolio_edit_columns( $portfolio_columns ) {
	$portfolio_columns = array(
		"cb" => "<input type=\"checkbox\" />",
		"title" => __('Title' ,'rocknrolla'),
		"thumbnail" => __('Thumbnail', 'rocknrolla'),
		"author" => __('Author', 'rocknrolla'),
		"date" => __('Date', 'rocknrolla'),
	);
	return $portfolio_columns;
}

function portfolio_column_display( $portfolio_columns, $post_id ) {

	// Code from: http://wpengineer.com/display-post-thumbnail-post-page-overview
	
	switch ( $portfolio_columns ) {
		
		// Display the thumbnail in the column view
		case "thumbnail":
			$width = (int) 75;
			$height = (int) 75;
			$thumbnail_id = get_post_meta( $post_id, '_thumbnail_id', true );
			
			// Display the featured image in the column view if possible
			if ( $thumbnail_id ) {
				$thumb = wp_get_attachment_image( $thumbnail_id, array($width, $height), true );
			}
			if ( isset( $thumb ) ) {
				echo $thumb;
			} else {
				echo __('None', 'rocknrolla');
			}
			break;	
			
		// Display the portfolio tags in the column view
		case "listings_filter":
		
		if ( $category_list = get_the_term_list( $post_id, 'listings_filter', '', ', ', '' ) ) {
			echo $category_list;
		} else {
			echo __('None', 'rocknrolla');
		}
		break;			
	}
}

// Adds Custom Post Type
add_action('init', 'portfolio_register'); 

// Adds columns in the admin view for thumbnail and taxonomies
add_filter( 'manage_edit-portfolio_columns', 'portfolio_edit_columns' );
add_action( 'manage_posts_custom_column', 'portfolio_column_display', 10, 2 );

?>
