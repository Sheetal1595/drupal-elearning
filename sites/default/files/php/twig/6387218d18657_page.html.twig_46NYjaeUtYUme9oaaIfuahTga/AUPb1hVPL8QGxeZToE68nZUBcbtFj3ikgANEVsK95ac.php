<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/custom/elearning_theme/templates/page.html.twig */
class __TwigTemplate_b9c1abc397918b76a5392e63a8f69bd2998d77eb40559415dcf3ffc66dfa0149 extends \Twig\Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css\">
<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic.min.css\" integrity=\"sha512-LeCmts7kEi09nKc+DwGJqDV+dNQi/W8/qb0oUSsBLzTYiBwxj0KBlAow2//jV7jwEHwSCPShRN2+IWwWcn1x7Q==\" crossorigin=\"anonymous\" referrerpolicy=\"no-referrer\" />
<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css\" integrity=\"sha512-UyNhw5RNpQaCai2EdC+Js0QL4RlVmiq41DkmCJsRV3ZxipG2L0HhTqIf/H9Hp8ez2EnFlkBnjRGJU2stW3Lj+w==\" crossorigin=\"anonymous\" referrerpolicy=\"no-referrer\" />
<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-foundation.min.css\" integrity=\"sha512-FxxtEcqC30sYnk1uvdsbiBuRRAOjXQlSc/YPN5d9oVTBhsuqy3ptkPqkXinxwpscyhQz8I9BLa+EhlvxtwFTGg==\" crossorigin=\"anonymous\" referrerpolicy=\"no-referrer\" />
<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">
<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.css\" integrity=\"sha512-RWhcC19d8A3vE7kpXq6Ze4GcPfGe3DQWuenhXAbcGiZOaqGojLtWwit1eeM9jLGHFv8hnwpX3blJKGjTsf2HxQ==\" crossorigin=\"anonymous\" referrerpolicy=\"no-referrer\" />
<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js\"></script>

<script src=\"https://unpkg.com/sweetalert2@7.22.2/dist/sweetalert2.all.js\"></script>


<div class=\"bg-top navbar-light\">
   <div class=\"container\">
      <div class=\"row no-gutters d-flex align-items-center align-items-stretch\">
         <div class=\"col-md-4 d-flex align-items-center py-4\">
            ";
        // line 16
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "header", [], "any", false, false, true, 16), 16, $this->source), "html", null, true);
        echo "
         </div>
         <div class=\"col-lg-8 d-block\">
            <div class=\"row d-flex\">
              
               <div class=\"col-md d-flex topper align-items-center align-items-stretch py-md-4\">
                  <div class=\"icon d-flex justify-content-center align-items-center\"><span class=\"fa fa-paper-plane\"></span></div>
                  <div class=\"text\">
                     <span>Email</span>
                     <span>elearn@email.com</span>
                  </div>
               </div>
               <div class=\"col-md d-flex topper align-items-center align-items-stretch py-md-4\">
                  <div class=\"icon d-flex justify-content-center align-items-center\"><span class=\"fa fa-phone\"></span></div>
                  <div class=\"text\">
                     <span>Call</span>
                     <span>Call Us: +91 908 0908 011</span>
                  </div>
               </div>
               
            </div>
         </div>
      </div>
   </div>
</div>
</div>


      <nav class=\"navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light\" id=\"ftco-navbar\">
         <div class=\"container d-flex align-items-center px-4\">
            <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#ftco-nav\" aria-controls=\"ftco-nav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">
            <span class=\"oi oi-menu\"></span> ";
        // line 47
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "menu", [], "any", false, false, true, 47), 47, $this->source), "html", null, true);
        echo "
            </button>
            
            <div class=\"collapse navbar-collapse\" id=\"ftco-nav\">
               ";
        // line 51
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "menu", [], "any", false, false, true, 51), 51, $this->source), "html", null, true);
        echo "

               <div class=\"login_menu\">
                  ";
        // line 54
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "login_menu", [], "any", false, false, true, 54), 54, $this->source), "html", null, true);
        echo "
               </div>
            </div>
         </div>

          
      </nav>
   
<section class=\"ftco-section ftco-no-pt ftc-no-pb\">
   <div class=\"container-fluid\">
      ";
        // line 64
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "content", [], "any", false, false, true, 64), 64, $this->source), "html", null, true);
        echo "
     
   </div>

   <div class=\"container\">
      ";
        // line 69
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "extra_content", [], "any", false, false, true, 69), 69, $this->source), "html", null, true);
        echo "
   </div>
</section>
 
 
<footer class=\"ftco-footer ftco-bg-dark ftco-section\">
    <div class=\"container\">
        <div class=\"row mb-5\">
            <div class=\"col-md-4 col-lg-4\">
                ";
        // line 78
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_first", [], "any", false, false, true, 78), 78, $this->source), "html", null, true);
        echo "
            </div>
            <div class=\"col-md-4 col-lg-4\" style=\"margin-top: -27px;\">
                ";
        // line 81
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_second", [], "any", false, false, true, 81), 81, $this->source), "html", null, true);
        echo "
            </div>
            <div class=\"col-md-4 col-lg-4\" style=\"margin-top: -27px;\">
                ";
        // line 84
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_third", [], "any", false, false, true, 84), 84, $this->source), "html", null, true);
        echo "
            </div>
            
        </div>
        <div class=\"row\">
            <div class=\"col-md-12 text-center\">
                <p>
                ";
        // line 91
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "copyright", [], "any", false, false, true, 91), 91, $this->source), "html", null, true);
        echo "
                </p>
            </div>
        </div>
    </div>
</footer>
        
";
    }

    public function getTemplateName()
    {
        return "themes/custom/elearning_theme/templates/page.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  158 => 91,  148 => 84,  142 => 81,  136 => 78,  124 => 69,  116 => 64,  103 => 54,  97 => 51,  90 => 47,  56 => 16,  39 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "themes/custom/elearning_theme/templates/page.html.twig", "C:\\xampp\\htdocs\\drupal-elearning\\themes\\custom\\elearning_theme\\templates\\page.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array();
        static $filters = array("escape" => 16);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                [],
                ['escape'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
