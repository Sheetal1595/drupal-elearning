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

/* modules/custom/register/templates/userprofilepage.html.twig */
class __TwigTemplate_4faff1ecb034ec166d452a2e3fdcfaa65dd5e4c3d17096668be24d6e4cb154da extends \Twig\Template
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
        echo "

<div class=\"views-col col-1\" style=\"margin-left: 11%;width: 75%!important;\">
   <div class=\"views-field views-field-user-picture\" style=\"display:none\">
      <div class=\"field-content\">  <img loading=\"lazy\" src=\"/drupal-elearning/sites/default/files/styles/medium/public/pictures/2022-10/6.jpg?itok=wMG7YU5g\" width=\"140\" height=\"180\" alt=\"\" typeof=\"foaf:Image\">
      </div>
   </div>
   <div class=\"views-field views-field-name\"><span class=\"field-content\">
   
    ";
        // line 10
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["items"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["rec"]) {
            // line 11
            echo "        <h3 class=\"mb-0\"> Username : <i></i>";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["rec"], "name", [], "any", false, false, true, 11), 11, $this->source), "html", null, true);
            echo "</h3>
        <h3 class=\"mb-0\"> Email Id : <i></i>";
            // line 12
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["rec"], "email", [], "any", false, false, true, 12), 12, $this->source), "html", null, true);
            echo "</h3>
    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['rec'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 14
        echo " </div>
   <div class=\"views-field views-field-field-trainer-designation\">
      <div class=\"field-content\">
         <h3>Applied Course<i></i></h3>
      
        
   <table class=\"table\">
        <thead>
            <tr>
            <th scope=\"col\" style=\"text-align: center;\">Coure Name</th>
            <th scope=\"col\" style=\"text-align: center;\">Applied Course</th>
            </tr>
        </thead>
        <tbody>
        
           ";
        // line 29
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["data"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["rec"]) {
            // line 30
            echo "         <tr>
            <td><h3 class=\"mb-0\"><i></i>";
            // line 31
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["rec"], "cname", [], "any", false, false, true, 31), 31, $this->source), "html", null, true);
            echo "</h3></td>
            <td><a href=";
            // line 32
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["rec"], "assesment", [], "any", false, false, true, 32), 32, $this->source), "html", null, true);
            echo ">Course Details</a></td>
          </tr>
            
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['rec'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 36
        echo "        </span>

        
            
            
        </tbody>
      
        </table>
      
      </div>
   </div>
</div>



<script>
\$(\"#block-login-link a\").text(\"Logout\");
</script>";
    }

    public function getTemplateName()
    {
        return "modules/custom/register/templates/userprofilepage.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  105 => 36,  95 => 32,  91 => 31,  88 => 30,  84 => 29,  67 => 14,  59 => 12,  54 => 11,  50 => 10,  39 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "modules/custom/register/templates/userprofilepage.html.twig", "C:\\xampp\\htdocs\\drupal-elearning\\modules\\custom\\register\\templates\\userprofilepage.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("for" => 10);
        static $filters = array("escape" => 11);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                ['for'],
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
