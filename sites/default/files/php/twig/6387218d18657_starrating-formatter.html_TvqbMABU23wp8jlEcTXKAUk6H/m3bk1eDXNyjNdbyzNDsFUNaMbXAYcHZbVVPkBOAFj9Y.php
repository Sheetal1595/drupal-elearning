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

/* modules/contrib/starrating/templates/starrating-formatter.html.twig */
class __TwigTemplate_43a4ae6f17047098aaa072a8edf41ba0de81de30ebb8a9cbc1261ba20990b14a extends \Twig\Template
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
        echo "<div class='starrating'>
";
        // line 2
        if ((($context["type"] ?? null) == "starrating")) {
            // line 3
            echo "    ";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(range(($context["min"] ?? null), ($context["max"] ?? null)));
            foreach ($context['_seq'] as $context["_key"] => $context["i"]) {
                if ((($context["i"] < ($context["rate"] ?? null)) || (($context["i"] > ($context["rate"] ?? null)) && ($context["fill_blank"] ?? null)))) {
                    // line 4
                    echo "      ";
                    if ((($context["i"] > ($context["rate"] ?? null)) && ($context["fill_blank"] ?? null))) {
                        // line 5
                        echo "        ";
                        $context["class"] = ($this->sandbox->ensureToStringAllowed(($context["icon_type"] ?? null), 5, $this->source) . "-off");
                        // line 6
                        echo "      ";
                    } else {
                        // line 7
                        echo "        ";
                        $context["class"] = (($this->sandbox->ensureToStringAllowed(($context["icon_type"] ?? null), 7, $this->source) . $this->sandbox->ensureToStringAllowed(($context["icon_color"] ?? null), 7, $this->source)) . "-on");
                        // line 8
                        echo "      ";
                    }
                    // line 9
                    echo "      ";
                    if (($context["i"] % 2)) {
                        // line 10
                        echo "          ";
                        $context["class"] = ($this->sandbox->ensureToStringAllowed(($context["class"] ?? null), 10, $this->source) . " odd");
                        // line 11
                        echo "      ";
                    } else {
                        // line 12
                        echo "      ";
                        $context["class"] = ($this->sandbox->ensureToStringAllowed(($context["class"] ?? null), 12, $this->source) . " even");
                        // line 13
                        echo "      ";
                    }
                    // line 14
                    echo "      ";
                    $context["j"] = ($context["i"] + 1);
                    // line 15
                    echo "      ";
                    $context["class"] = (($this->sandbox->ensureToStringAllowed(($context["class"] ?? null), 15, $this->source) . " s") . $this->sandbox->ensureToStringAllowed(($context["j"] ?? null), 15, $this->source));
                    // line 16
                    echo "       <div class='rate-image ";
                    echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["class"] ?? null), 16, $this->source), "html", null, true);
                    echo "'></div>
    ";
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['i'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
        } else {
            // line 19
            echo " ";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["rate"] ?? null), 19, $this->source), "html", null, true);
            echo "
";
        }
        // line 21
        echo "</div>
";
    }

    public function getTemplateName()
    {
        return "modules/contrib/starrating/templates/starrating-formatter.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  103 => 21,  97 => 19,  86 => 16,  83 => 15,  80 => 14,  77 => 13,  74 => 12,  71 => 11,  68 => 10,  65 => 9,  62 => 8,  59 => 7,  56 => 6,  53 => 5,  50 => 4,  44 => 3,  42 => 2,  39 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "modules/contrib/starrating/templates/starrating-formatter.html.twig", "C:\\xampp\\htdocs\\drupal-elearning\\modules\\contrib\\starrating\\templates\\starrating-formatter.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 2, "for" => 3, "set" => 5);
        static $filters = array("escape" => 16);
        static $functions = array("range" => 3);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'for', 'set'],
                ['escape'],
                ['range']
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
