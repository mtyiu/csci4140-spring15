<?php

namespace CuhkCse\GuestbookBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use CuhkCse\GuestbookBundle\Entity\Message;

class DefaultController extends Controller {
	protected $data = array();

	public function indexAction() {
		$em = $this->getDoctrine()->getManager();
		$this->data[ 'messages' ] = $em->getRepository( 'CuhkCseGuestbookBundle:Message' )->findAll();
        return $this->render( 'CuhkCseGuestbookBundle:Default:index.html.twig', $this->data );
    }

	public function formAction( Request $request, $id ) {
		$em = $this->getDoctrine()->getManager();
		if ( $id ) {
			$message = $em->getRepository( 'CuhkCseGuestbookBundle:Message' )->find( $id );
			if ( ! $message ) {
				throw $this->createNotFoundException();
			}
		} else {
			$message = new Message();
		}
		$form = $this->createFormBuilder( $message )
			->add( 'name', 'text')
			->add( 'email', 'email' )
			->add( 'message', 'textarea' )
			->add( 'submit', 'submit' )
			->add( 'reset', 'reset' )
			->getForm();

		$form->handleRequest( $request );

		if ( $form->isValid() ) {
			$em->persist( $message );
			$em->flush();

			$this->data[ 'success' ] = true;
		}

		$this->data[ 'form' ] = $form->createView();
        return $this->render( 'CuhkCseGuestbookBundle:Default:form.html.twig', $this->data );
    }
}
