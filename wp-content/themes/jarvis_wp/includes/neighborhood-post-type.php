<?php
function create_neighborhood_post() {
    $post_data = array(
        'labels'=>array(
            'name'=>_('Neighborhoods'),
            'singular_name'=>_('Neighborhood Item')
        ),
        'public'=>true,
        'show_ui'=>true,
        'capability_type'=>'post',
        'rewrite'=>array('slug'=>'neighborhood-item'),
        'supports' => array('title', 'editor', 'thumbnail', 'comments'),  
        'has_archive'=>false,
    );
    register_post_type('neighborhood', $post_data);
}
add_action('init','create_neighborhood_post');
?>
